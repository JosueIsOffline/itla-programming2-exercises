using FitStarter.Domain.Contracts;
using FitStarter.Domain.Models;

namespace FitStarter.Domain.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse?> LoginAsync(LoginRequest request);
        Task<AuthResponse?> RefreshTokenAsync(RefreshTokenRequest request);
        Task<bool> LogoutAsync(string refreshToken);
        Task<bool> RegisterAsync(CreateUser request);
    }
}