using AutoMapper;
using FitStarter.Application.Contracts;
using FitStarter.Domain.Entities;
using FitStarter.Infastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitStarter.Controllers
{
    [ApiController]
    [Route("api/nutrition-tips")]
    public class NutritionTipController : ControllerBase
    {
        private readonly IBaseRepository<NutritionTip> _nutritionTipRepository;
        private readonly IMapper _mapper;

        public NutritionTipController(IBaseRepository<NutritionTip> nutritionTipRepository, IMapper mapper)
        {
            _nutritionTipRepository = nutritionTipRepository ?? throw new ArgumentNullException(nameof(nutritionTipRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<IActionResult> GetNutritionTips([FromQuery] string? category = null, [FromQuery] string? targetGoal = null)
        {
            var tips = await _nutritionTipRepository.GetAll();
            var activeTips = tips.Where(t => t.IsActive);

            if (!string.IsNullOrEmpty(category))
            {
                activeTips = activeTips.Where(t => t.Category.ToLower() == category.ToLower());
            }

            if (!string.IsNullOrEmpty(targetGoal))
            {
                activeTips = activeTips.Where(t => t.TargetGoal.ToLower() == targetGoal.ToLower() || t.TargetGoal.ToLower() == "all");
            }

            var tipDtos = _mapper.Map<List<NutritionTipDto>>(activeTips.OrderBy(t => t.Category).ThenBy(t => t.Title).ToList());
            return Ok(tipDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNutritionTipById(int id)
        {
            try
            {
                var tip = await _nutritionTipRepository.GetOneById(id);

                if (!tip.IsActive)
                {
                    return NotFound($"Nutrition tip with Id {id} not found.");
                }

                var tipDto = _mapper.Map<NutritionTipDto>(tip);
                return Ok(tipDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        [Authorize] // Only authenticated users can create tips
        public async Task<IActionResult> CreateNutritionTip([FromBody] CreateNutritionTip createTip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tip = _mapper.Map<NutritionTip>(createTip);

            try
            {
                var createdTip = await _nutritionTipRepository.Add(tip);
                var tipDto = _mapper.Map<NutritionTipDto>(createdTip);
                return CreatedAtAction(nameof(GetNutritionTipById), new { id = createdTip.Id }, tipDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize] // Only authenticated users can update tips
        public async Task<IActionResult> UpdateNutritionTip(int id, [FromBody] UpdateNutritionTip updateTip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existingTip = await _nutritionTipRepository.GetOneById(id);
                if (existingTip == null)
                {
                    return NotFound($"Nutrition tip with Id {id} not found.");
                }

                var tipToUpdate = _mapper.Map(updateTip, existingTip);
                var updatedTip = await _nutritionTipRepository.Update(tipToUpdate);
                var tipDto = _mapper.Map<NutritionTipDto>(updatedTip);
                return Ok(tipDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize] // Only authenticated users can delete tips
        public async Task<IActionResult> DeleteNutritionTip(int id)
        {
            try
            {
                var tip = await _nutritionTipRepository.GetOneById(id);
                tip.IsActive = false; // Soft delete
                await _nutritionTipRepository.Update(tip);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = new[]
            {
                new { value = "general", label = "General" },
                new { value = "pre_workout", label = "Pre-entreno" },
                new { value = "post_workout", label = "Post-entreno" },
                new { value = "hydration", label = "Hidratación" }
            };

            return Ok(categories);
        }

        [HttpGet("target-goals")]
        public async Task<IActionResult> GetTargetGoals()
        {
            var goals = new[]
            {
                new { value = "all", label = "Todos" },
                new { value = "lose_weight", label = "Perder peso" },
                new { value = "gain_muscle", label = "Ganar músculo" },
                new { value = "stay_fit", label = "Mantenerse fit" },
                new { value = "build_endurance", label = "Resistencia" }
            };

            return Ok(goals);
        }
    }
}
