using Backend_Blog.Data;
using Backend_Blog.Entities;
using Backend_Blog.Models;
using Backend_Blog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend_Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EditProfileController(MyBlogContext context, IUploadPhotoService uploadPhoto) : ControllerBase
    {
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> EditProfile([FromForm] EditProfileDTO request)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!Guid.TryParse(currentUserId, out var userId)) return Unauthorized();

            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user is null)
            {
                return NotFound(new { message = "Không tìm thấy người dùng!!" });
            }

            if (user.Email != request.Email)
            {
                var emailExists = await context.Users.AnyAsync(u => u.Email == request.Email);
                if (emailExists)
                {
                    return BadRequest(new { message = "Email đã được sử dụng ở tài khoản!!" });
                }
            }

            if (!string.IsNullOrEmpty(request.Username)) user.Username = request.Username;
            if (!string.IsNullOrEmpty(request.Email)) user.Email = request.Email;

            if (request.Bio != null) user.Bio = request.Bio;
            if (request.Avatar != null)
            {
                string sercureUrl = await uploadPhoto.UploadPhotoAsync(request.Avatar, "blog_posts");
                user.Avatar = sercureUrl;
            }

            if (!string.IsNullOrEmpty(request.Password))
            {
                user.PasswordHash = new PasswordHasher<User>().HashPassword(user, request.Password);
                user.RefreshToken = null;          
                user.RefreshTokenExpiryTime = null;
            }


            await context.SaveChangesAsync();

            return Ok(new
            {
                username = user.Username,
                email = user.Email,
                avatar = user.Avatar ?? $"https://ui-avatars.com/api/?name={user.Username}&background=3b82f6&color=fff",
                bio = user.Bio ?? "404 bio not found",
                createdAt = user.CreatedAt.ToString("MMM dd, yyyy")
            });
        }
    }
}
