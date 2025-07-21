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
    [Route("api/workout-sessions")]
    // [Authorize]
    public class WorkoutSessionController : ControllerBase
    {
        private readonly IBaseRepository<WorkoutSession> _workoutSessionRepository;
        private readonly IMapper _mapper;

        public WorkoutSessionController(IBaseRepository<WorkoutSession> workoutSessionRepository, IMapper mapper)
        {
            _workoutSessionRepository = workoutSessionRepository ?? throw new ArgumentNullException(nameof(workoutSessionRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<IActionResult> GetWorkoutSessions([FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var workoutSessions = await _workoutSessionRepository.GetAll(ws => ws.Exercise, ws => ws.User);

            var filteredSessions = workoutSessions.Where(ws => ws.UserId == userId.Value);

            if (startDate.HasValue)
            {
                filteredSessions = filteredSessions.Where(ws => ws.SessionDate >= startDate.Value.Date);
            }

            if (endDate.HasValue)
            {
                filteredSessions = filteredSessions.Where(ws => ws.SessionDate <= endDate.Value.Date);
            }

            var sessionDtos = _mapper.Map<List<WorkoutSessionDto>>(filteredSessions.OrderByDescending(ws => ws.SessionDate).ToList());
            return Ok(sessionDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkoutSessionById(int id)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            try
            {
                var workoutSession = await _workoutSessionRepository.GetOneById(id, ws => ws.Exercise, ws => ws.User);

                if (workoutSession.UserId != userId.Value)
                {
                    return Forbid();
                }

                var sessionDto = _mapper.Map<WorkoutSessionDto>(workoutSession);
                return Ok(sessionDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorkoutSession([FromBody] CreateWorkoutSession createWorkoutSession)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var workoutSession = _mapper.Map<WorkoutSession>(createWorkoutSession);
            workoutSession.UserId = userId.Value;

            try
            {
                var createdSession = await _workoutSessionRepository.Add(workoutSession);
                var sessionDto = _mapper.Map<WorkoutSessionDto>(createdSession);
                return CreatedAtAction(nameof(GetWorkoutSessionById), new { id = createdSession.Id }, sessionDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorkoutSession(int id, [FromBody] UpdateWorkoutSession updateWorkoutSession)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existingSession = await _workoutSessionRepository.GetOneById(id);

                if (existingSession.UserId != userId.Value)
                {
                    return Forbid();
                }

                var sessionToUpdate = _mapper.Map(updateWorkoutSession, existingSession);
                var updatedSession = await _workoutSessionRepository.Update(sessionToUpdate);
                var sessionDto = _mapper.Map<WorkoutSessionDto>(updatedSession);
                return Ok(sessionDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkoutSession(int id)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            try
            {
                var workoutSession = await _workoutSessionRepository.GetOneById(id);

                if (workoutSession.UserId != userId.Value)
                {
                    return Forbid();
                }

                await _workoutSessionRepository.Delete(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetWorkoutStats([FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var workoutSessions = await _workoutSessionRepository.GetAll();
            var userSessions = workoutSessions.Where(ws => ws.UserId == userId.Value && ws.Completed);

            if (startDate.HasValue)
            {
                userSessions = userSessions.Where(ws => ws.SessionDate >= startDate.Value.Date);
            }

            if (endDate.HasValue)
            {
                userSessions = userSessions.Where(ws => ws.SessionDate <= endDate.Value.Date);
            }

            var sessionsList = userSessions.OrderBy(ws => ws.SessionDate).ToList();

            var stats = new WorkoutStatsDto
            {
                TotalWorkouts = sessionsList.Count,
                TotalMinutes = sessionsList.Sum(ws => ws.DurationMinutes),
                TotalCalories = sessionsList.Sum(ws => ws.CaloriesBurned),
                LastWorkoutDate = sessionsList.LastOrDefault()?.SessionDate,
                CurrentStreak = CalculateCurrentStreak(sessionsList)
            };

            return Ok(stats);
        }

        private int? GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(userIdClaim, out int userId) ? userId : null;
        }

        private int CalculateCurrentStreak(List<WorkoutSession> sessions)
        {
            if (!sessions.Any()) return 0;

            var distinctDates = sessions.Select(s => s.SessionDate.Date).Distinct().OrderByDescending(d => d).ToList();

            int streak = 0;
            var currentDate = DateTime.Today;

            foreach (var date in distinctDates)
            {
                if (date == currentDate || date == currentDate.AddDays(-1))
                {
                    streak++;
                    currentDate = date.AddDays(-1);
                }
                else
                {
                    break;
                }
            }

            return streak;
        }
    }
}
