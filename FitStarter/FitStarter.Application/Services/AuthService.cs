using AutoMapper;
using BCrypt.Net;
using FitStarter.Application.Contracts;
using FitStarter.Domain.Entities;
using FitStarter.Domain.Models;
using FitStarter.Domain.Interfaces;
using FitStarter.Infastructure.Repositories;
using FitStarter.Common.Requests;
using FitStarter.Common.Responses;

namespace FitStarter.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IBaseRepository<User> _userRepository;
        private readonly IJwtService _jwtService;
        private readonly IMapper _mapper;

        public AuthService(
            IBaseRepository<User> userRepository,
            IJwtService jwtService,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
            _mapper = mapper;
        }

        public async Task<AuthResponse?> LoginAsync(LoginRequest request)
        {
            try
            {
                var users = await _userRepository.GetAll();
                var user = users.FirstOrDefault(u => u.Email.ToLower() == request.Email.ToLower());

                if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                {
                    return null;
                }

                if (!user.IsActive)
                {
                    return null;
                }

                var accessToken = _jwtService.GenerateAccessToken(user);
                var refreshToken = await _jwtService.CreateRefreshTokenAsync(user.Id);

                return new AuthResponse
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken.Token,
                    AccessTokenExpiry = DateTime.UtcNow.AddMinutes(15),
                    RefreshTokenExpiry = refreshToken.ExpiryDate,
                    User = new UserInfo
                    {
                        Id = user.Id,
                        FullName = user.FullName,
                        Email = user.Email,
                        FitnessGoal = user.FitnessGoal,
                        ExperienceLevel = user.ExperienceLevel
                    }
                };
            }
            catch
            {
                return null;
            }
        }

        public async Task<AuthResponse?> RefreshTokenAsync(RefreshTokenRequest request)
        {
            if (!await _jwtService.ValidateRefreshTokenAsync(request.RefreshToken))
            {
                return null;
            }

            var users = await _userRepository.GetAll();
            var user = users.FirstOrDefault(); // You'd need to get user by refresh token

            if (user == null || !user.IsActive)
            {
                return null;
            }

            // Revoke old refresh token
            await _jwtService.RevokeRefreshTokenAsync(request.RefreshToken);

            // Generate new tokens
            var accessToken = _jwtService.GenerateAccessToken(user);
            var refreshToken = await _jwtService.CreateRefreshTokenAsync(user.Id);

            return new AuthResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                AccessTokenExpiry = DateTime.UtcNow.AddMinutes(15),
                RefreshTokenExpiry = refreshToken.ExpiryDate,
                User = new UserInfo
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    FitnessGoal = user.FitnessGoal,
                    ExperienceLevel = user.ExperienceLevel
                }
            };
        }

        public async Task<bool> LogoutAsync(string refreshToken)
        {
            await _jwtService.RevokeRefreshTokenAsync(refreshToken);
            return true;
        }

        public async Task<bool> RegisterAsync(CreateUser request)
        {
            try
            {
                var users = await _userRepository.GetAll();
                if (users.Any(u => u.Email.ToLower() == request.Email.ToLower()))
                {
                    return false; // Email already exists
                }

                var user = _mapper.Map<User>(request);
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

                await _userRepository.Add(user);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}