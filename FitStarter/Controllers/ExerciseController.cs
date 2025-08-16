using AutoMapper;
using FitStarter.Application.Contracts;
using FitStarter.Domain.Entities;
using FitStarter.Infastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitStarter.Controllers
{
    [ApiController]
    [Route("api/exercises")]
    // [Authorize]
    public class ExerciseController : ControllerBase
    {
        private readonly IBaseRepository<Exercise> _exerciseRepository;
        private readonly IMapper _mapper;

        public ExerciseController(IBaseRepository<Exercise> exerciseRepository, IMapper mapper)
        {
            _exerciseRepository = exerciseRepository ?? throw new ArgumentNullException(nameof(exerciseRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<IActionResult> GetExercises([FromQuery] string? type = null, [FromQuery] string? muscleGroup = null)
        {
            var exercises = await _exerciseRepository.GetAll();

            var filteredExercises = exercises.Where(e => e.IsActive);

            if (!string.IsNullOrEmpty(type))
            {
                filteredExercises = filteredExercises.Where(e => e.ExerciseType.ToLower() == type.ToLower());
            }

            if (!string.IsNullOrEmpty(muscleGroup))
            {
                filteredExercises = filteredExercises.Where(e => e.MuscleGroup.ToLower().Contains(muscleGroup.ToLower()));
            }

            var exerciseDtos = _mapper.Map<List<ExerciseDto>>(filteredExercises.ToList());
            return Ok(exerciseDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExerciseById(int id)
        {
            try
            {
                var exercise = await _exerciseRepository.GetOneById(id);
                if (!exercise.IsActive)
                {
                    return NotFound($"Exercise with Id {id} not found.");
                }

                var exerciseDto = _mapper.Map<ExerciseDto>(exercise);
                return Ok(exerciseDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateExercise([FromBody] CreateExercise createExercise)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exercise = _mapper.Map<Exercise>(createExercise);

            try
            {
                var createdExercise = await _exerciseRepository.Add(exercise);
                var exerciseDto = _mapper.Map<ExerciseDto>(createdExercise);
                return CreatedAtAction(nameof(GetExerciseById), new { id = createdExercise.Id }, exerciseDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExercise(int id, [FromBody] UpdateExercise updateExercise)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existingExercise = await _exerciseRepository.GetOneById(id);
                if (existingExercise == null)
                {
                    return NotFound($"Exercise with Id {id} not found.");
                }

                var exerciseToUpdate = _mapper.Map(updateExercise, existingExercise);
                var updatedExercise = await _exerciseRepository.Update(exerciseToUpdate);
                var exerciseDto = _mapper.Map<ExerciseDto>(updatedExercise);
                return Ok(exerciseDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExercise(int id)
        {
            try
            {
                var exercise = await _exerciseRepository.GetOneById(id);
                exercise.IsActive = false;
                await _exerciseRepository.Update(exercise);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
