using Backend_Blog.Data;
using Backend_Blog.Entities;
using Backend_Blog.Models;
using Backend_Blog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
        public async Task<ActionResult<TokenReponseDTO>> Login(UserDTO request)
        {
            var result = await authService.LoginAsync(request);
            if (result is null)
            {
                return BadRequest(new { message = "Email hoặc mật khẩu không đúng!" });
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", result.RefreshToken, cookieOptions);
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            return Ok(new
            {
                token = result.AccessToken,
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
        [Authorize]
        [HttpGet]
        public IActionResult AuthenticatedOnlyEndpoint()
        {
            return Ok("You are authenticated!");
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> CurrentUserOnlyEndpoint()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(currentUserId) || !Guid.TryParse(currentUserId, out var userId))
                return Unauthorized();

            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user is null) return NotFound();

            return Ok(new
            {
                username = user.Username,
                email = user.Email,
                avatar = user.Avatar ?? $"https://ui-avatars.com/api/?name={user.Username}&background=3b82f6&color=fff",
                bio = user.Bio ?? "404 bio not found",
                createdAt = user.CreatedAt.ToString("MMM dd, yyyy")
            });
        }


        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized(new { message = "Không tìm thấy Refresh Token!" });
            }

            var user = await context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user is null || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return Unauthorized(new { message = "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!" });
            }

            var newAccessToken = authService.GenerateJwtToken(user);

            return Ok(new
            {
                token = newAccessToken
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPassworDTO request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.email);
            if(user is null)
            {
                return BadRequest(new { message = "Email không tồn tại trong hệ thống!" });
            }

            string resetToken = Guid.NewGuid().ToString();

            user.ResetToken = resetToken;
            user.ResetTokenExpiryTime = DateTime.UtcNow.AddMinutes(15);

            await context.SaveChangesAsync();

            return Ok(new
            {
                message = "Yêu cầu thành công! Vui lòng đặt mật khẩu mới.",
                resetToken = resetToken
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPassworDTO request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.email);
            if (user is null)
            {
                return BadRequest(new { message = "Email không tồn tại trong hệ thống!" });
            }
            if(user.ResetToken != request.token || user.ResetTokenExpiryTime <= DateTime.UtcNow)
            {
                return BadRequest(new { message = "Mã xác thực không hợp lệ hoặc đã hết hạn!" });

            }

            user.PasswordHash = new PasswordHasher<User>().HashPassword(user, request.newPassword);

            user.ResetToken = null;

            user.RefreshTokenExpiryTime = null;
            await context.SaveChangesAsync();

            return Ok(new { message = "Đặt lại mật khẩu thành công! Hãy đăng nhập bằng mật khẩu mới." });
        }
    }
}
