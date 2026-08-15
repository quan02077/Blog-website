using Backend_Blog.Entities;
using Backend_Blog.Models;

namespace Backend_Blog.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserDTO request);
        Task<TokenReponseDTO?> LoginAsync(UserDTO request);
        Task<TokenReponseDTO?> RefreshTokenAsync(RefreshTokenRequestDTO request);
    }
}
