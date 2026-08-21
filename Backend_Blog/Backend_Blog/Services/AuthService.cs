using Backend_Blog.Data;
using Backend_Blog.Entities;
using Backend_Blog.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Backend_Blog.Services
{
    public class AuthService(MyBlogContext context, IConfiguration configuration) : IAuthService
    {
        public async Task<TokenReponseDTO?> LoginAsync(UserDTO request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user is null)
            {
                return null;
            }
            if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
            {
                return null;
            }
            return await CreateTokenReponse(user);
        }

        private async Task<TokenReponseDTO> CreateTokenReponse(User user)
        {
            return new TokenReponseDTO
            {
                AccessToken = GenerateJwtToken(user),
                RefreshToken = await GenerateAndSaveRefreshToken(user)
            };
        }

        public async Task<User?> RegisterAsync(UserDTO request)
        {
            if (await context.Users.AnyAsync(u => u.Username == request.Username))
            {
                return null;
            }
            var user = new User();
            var passwordHasher = new PasswordHasher<User>().HashPassword(user, request.Password);
            user.Email = request.Email;
            user.Username = request.Username;
            user.PasswordHash = passwordHasher;
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return user;
        }

        public async Task<TokenReponseDTO?> RefreshTokenAsync(RefreshTokenRequestDTO request)
        {
            var user = await ValidateToken(request.UserId, request.RefreshToken);
            if (user is null) return null;
            return await CreateTokenReponse(user);
        }

        public async Task<User?> ValidateToken(Guid userId, string refreshToken)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user is null || user.RefreshTokenExpiryTime < DateTime.UtcNow || user.RefreshToken != refreshToken) return null;
            return user;

        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new Byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<string> GenerateAndSaveRefreshToken(User user)
        {
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await context.SaveChangesAsync();
            return refreshToken;
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var tokenKey = configuration["AppSettings:Token"] ?? throw new Exception("Chưa cấu hình AppSettings:Token trong appsetting.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken
            (
                issuer: configuration["AppSettings:Issuer"],
                audience: configuration["AppSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }

        object IAuthService.GenerateJwtToken(User user)
        {
            return GenerateJwtToken(user);
        }
    }
}
