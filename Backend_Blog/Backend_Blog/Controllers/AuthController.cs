using Backend_Blog.Data;
using Backend_Blog.Entities;
using Backend_Blog.Models;
using Backend_Blog.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService, MyBlogContext context) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO request)
        {
            var result = await authService.RegisterAsync(request);
            if (result is null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [HttpPost("login")] 
        public async Task<IActionResult> Login(UserDTO request)
        {
            var result = await authService.LoginAsync(request);
            if (result is null)
            {
                return BadRequest(new { message = "Email hoặc mật khẩu không đúng!" });
            }
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            return Ok(new
            {
                token = result,
                user = new
                {
                    username = user.Username,
                    email = user.Email,
                    avatar = user.Avatar ?? $"https://ui-avatars.com/api/?name={user.Username}&background=3b82f6&color=fff",
                    bio = user.Bio ?? "404 bio not found",
                    createdAt = user.CreatedAt.ToString("MMM dd, yyyy")
                }
            });
        }   
    }
}
