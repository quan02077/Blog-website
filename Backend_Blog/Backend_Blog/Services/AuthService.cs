using Backend_Blog.Data;
using Backend_Blog.Entities;
using Backend_Blog.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend_Blog.Services
{
    public class AuthService(MyBlogContext context, IConfiguration configuration) : IAuthService
    {
        public async Task<string?> LoginAsync(UserDTO request)
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
            return GenerateJwtToken(user);
        }

        public async Task<User?> RegisterAsync(UserDTO request)
        {
            if(await context.Users.AnyAsync(u => u.Username == request.Username))
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

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
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
    }
}
