using FitStarter.Common.Requests;
using FitStarter.Common.Responses;

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