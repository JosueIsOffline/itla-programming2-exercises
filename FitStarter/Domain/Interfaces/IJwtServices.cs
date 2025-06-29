using FitStarter.Domain.Entities;
using FitStarter.Domain.Models;

namespace FitStarter.Domain.Interfaces
{
    public interface IJwtService
    {
        string GenerateAccessToken(User user);
        string GenerateRefreshToken();
        TokenValidationResult ValidateToken(string token);
        Task<RefreshToken> CreateRefreshTokenAsync(int userId);
        Task<bool> ValidateRefreshTokenAsync(string token);
        Task RevokeRefreshTokenAsync(string token);
        Task RevokeAllUserRefreshTokensAsync(int userId);
    }
}