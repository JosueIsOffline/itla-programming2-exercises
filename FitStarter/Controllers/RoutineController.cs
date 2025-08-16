using AutoMapper;
using FitStarter.Application.Contracts;
using FitStarter.Domain.Entities;
using FitStarter.Infastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitStarter.Controllers
{
    [ApiController]
    [Route("api/")]
    [Authorize]
    public class RoutineController : ControllerBase
    {
        private readonly IBaseRepository<Routine> _routineRepository;
        private readonly IMapper _mapper;
        public RoutineController(IBaseRepository<Routine> routineRepository, IMapper mapper)
        {
            _routineRepository = routineRepository ?? throw new ArgumentNullException(nameof(routineRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet("routines")]
        public async Task<IActionResult> GetRoutines()
        {
            var routines = await _routineRepository.GetAll();
            return Ok(routines);
        }

        [HttpGet("routines/{id}")]
        public async Task<IActionResult> GetRoutineById(int id)
        {
            try
            {
                var routine = await _routineRepository.GetOneById(id);
                return Ok(routine);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("routines")]
        public async Task<IActionResult> CreateRoutine([FromBody] CreateRoutine createRoutine)
        {
            var routine = _mapper.Map<Routine>(createRoutine);
            try
            {
                var createdRoutine = await _routineRepository.Add(routine);
                return CreatedAtAction(nameof(GetRoutineById), new { id = createdRoutine.Id }, createdRoutine);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("routines/{id}")]
        public async Task<IActionResult> UpdateRoutine(int id, [FromBody] UpdateRoutine updateRoutine)
        {
            try
            {
                var existingRoutine = await _routineRepository.GetOneById(id);
                if (existingRoutine == null)
                {
                    return NotFound($"User with Id {id} not found.");
                }
                var routineToUpdate = _mapper.Map(updateRoutine, existingRoutine);
                var updatedRoutine = await _routineRepository.Update(routineToUpdate);
                return Ok(updatedRoutine);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("routines/{id}")]
        public async Task<IActionResult> DeleteRoutine(int id)
        {
            try
            {
                await _routineRepository.Delete(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
