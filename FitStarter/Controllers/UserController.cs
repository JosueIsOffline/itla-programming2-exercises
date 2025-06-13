using AutoMapper;
using FitStarter.Domain.Contracts;
using FitStarter.Domain.Entities;
using FitStarter.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FitStarter.Controllers
{
    [ApiController]
    [Route("api/")]
    public class UserController : ControllerBase
    {
        private readonly IBaseRepository<User> _userRepository;
        private readonly IMapper _mapper;

        public UserController(IBaseRepository<User> userRepository, IMapper mapper)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }



        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepository.GetAll();
            return Ok(users);
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var user = await _userRepository.GetOneById(id);
                return Ok(user);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("users")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUser createUser)
        {
            var user = _mapper.Map<User>(createUser);
            try
            {
                var createdUser = await _userRepository.Add(user);
                return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("users/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUser updateUser)
        {
            try
            {
                var existingUser = await _userRepository.GetOneById(id);
                if (existingUser == null)
                {
                    return NotFound($"User with Id {id} not found.");
                }
                var userToUpdate = _mapper.Map(updateUser, existingUser);
                var updatedUser = await _userRepository.Update(userToUpdate);
                return Ok(updatedUser);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var deletedUser = await _userRepository.Delete(id);
                return Ok(deletedUser);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}

   


