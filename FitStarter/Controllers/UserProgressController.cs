using AutoMapper;
using FitStarter.Domain.Contracts;
using FitStarter.Domain.Entities;
using FitStarter.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FitStarter.Controllers
{
    [ApiController]
    [Route("api/progress")]
    [Authorize]
    public class UserProgressController : ControllerBase
    {
        private readonly IBaseRepository<UserProgress> _progressRepository;
        private readonly IMapper _mapper;

        public UserProgressController(IBaseRepository<UserProgress> progressRepository, IMapper mapper)
        {
            _progressRepository = progressRepository ?? throw new ArgumentNullException(nameof(progressRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<IActionResult> GetUserProgress([FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var progressEntries = await _progressRepository.GetAll();
            var userProgress = progressEntries.Where(p => p.UserId == userId.Value);

            if (startDate.HasValue)
            {
                userProgress = userProgress.Where(p => p.RecordDate >= startDate.Value.Date);
            }

            if (endDate.HasValue)
            {
                userProgress = userProgress.Where(p => p.RecordDate <= endDate.Value.Date);
            }

            var progressDtos = _mapper.Map<List<UserProgressDto>>(userProgress.OrderByDescending(p => p.RecordDate).ToList());
            return Ok(progressDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProgressById(int id)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            try
            {
                var progress = await _progressRepository.GetOneById(id);

                if (progress.UserId != userId.Value)
                {
                    return Forbid();
                }

                var progressDto = _mapper.Map<UserProgressDto>(progress);
                return Ok(progressDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateProgress([FromBody] CreateUserProgress createProgress)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var progress = _mapper.Map<UserProgress>(createProgress);
            progress.UserId = userId.Value;

            try
            {
                var createdProgress = await _progressRepository.Add(progress);
                var progressDto = _mapper.Map<UserProgressDto>(createdProgress);
                return CreatedAtAction(nameof(GetProgressById), new { id = createdProgress.Id }, progressDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProgress(int id, [FromBody] UpdateUserProgress updateProgress)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existingProgress = await _progressRepository.GetOneById(id);

                if (existingProgress.UserId != userId.Value)
                {
                    return Forbid();
                }

                var progressToUpdate = _mapper.Map(updateProgress, existingProgress);
                var updatedProgress = await _progressRepository.Update(progressToUpdate);
                var progressDto = _mapper.Map<UserProgressDto>(updatedProgress);
                return Ok(progressDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProgress(int id)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            try
            {
                var progress = await _progressRepository.GetOneById(id);

                if (progress.UserId != userId.Value)
                {
                    return Forbid();
                }

                await _progressRepository.Delete(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetProgressSummary()
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var progressEntries = await _progressRepository.GetAll();
            var userProgress = progressEntries.Where(p => p.UserId == userId.Value)
                                              .OrderBy(p => p.RecordDate)
                                              .ToList();

            var summary = new ProgressSummaryDto
            {
                TotalEntries = userProgress.Count,
                LastRecordDate = userProgress.LastOrDefault()?.RecordDate,
                RecentEntries = _mapper.Map<List<UserProgressDto>>(userProgress.TakeLast(10).Reverse().ToList())
            };

            if (userProgress.Any(p => p.WeightKg.HasValue))
            {
                var weightEntries = userProgress.Where(p => p.WeightKg.HasValue).ToList();
                summary.CurrentWeight = weightEntries.LastOrDefault()?.WeightKg;
                summary.StartingWeight = weightEntries.FirstOrDefault()?.WeightKg;

                if (summary.CurrentWeight.HasValue && summary.StartingWeight.HasValue)
                {
                    summary.WeightChange = summary.CurrentWeight.Value - summary.StartingWeight.Value;
                }
            }

            return Ok(summary);
        }

        private int? GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(userIdClaim, out int userId) ? userId : null;
        }
    }
}
