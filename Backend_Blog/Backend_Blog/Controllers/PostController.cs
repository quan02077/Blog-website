using Backend_Blog.Models;
using Backend_Blog.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend_Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController(IPostService postService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await postService.GetAllPostsAsync();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostByID(Guid id)
        {
            var post = await postService.GetPostByIdAsync(id);
            if (post is null)
            {
                return NotFound(new { message = "Không tìm thấy bài viết này!!" });
            }
            return Ok(post);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromBody] WritePostDTO request)
        {   
            if (string.IsNullOrWhiteSpace(request.Title) || string.IsNullOrWhiteSpace(request.Content))
            {
                return BadRequest(new { message = "Tiêu đề và nội dung bài viết không được để trống!" });
            }

            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(currentUserId) || !Guid.TryParse(currentUserId, out var userId))
            {
                return Unauthorized(new { message = "Bạn cần đăng nhập để tạo bài viết!" });
            }

            try
            {
                var result = await postService.CreatePostAsync(request, userId);
                return CreatedAtAction(nameof(GetPostByID), new { id = result.Id }, result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi khi tạo bài viết: " + ex.Message });
            }
        }
    }
}
