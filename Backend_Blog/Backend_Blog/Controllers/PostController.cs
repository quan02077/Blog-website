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
        [HttpGet("categories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await postService.GetAllCategoriesAsync();
            return Ok(categories);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllPosts([FromQuery] string? searchTerm, [FromQuery] int? year)
        {
            var posts = await postService.GetAllPostsAsync(searchTerm, year);
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
        public async Task<IActionResult> CreatePost([FromForm] WritePostDTO request)
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

        [HttpGet("my-drafts")]
        [Authorize]
        public async Task<IActionResult> GetMyDrafts([FromQuery] string? searchTerm, [FromQuery] string? category, [FromQuery] string? sortBy)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(currentUserId) || !Guid.TryParse(currentUserId, out var userId))
            {
                return Unauthorized(new { message = "Bạn cần đăng nhập để lưu bản nháp!" });
            }

            try
            {
                var result = await postService.GetMyDraftsAsync(userId, searchTerm, category, sortBy);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi khi lấy bản nháp: " + ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePost(Guid id, [FromForm] WritePostDTO request)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(currentUserId) || !Guid.TryParse(currentUserId, out var userId))
            {
                return Unauthorized(new { message = "Bạn cần đăng nhập để chỉnh sửa bài viết!" });
            }

            try
            {
                var result = await postService.UpdatePostAsync(id, request, userId);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(currentUserId) || !Guid.TryParse(currentUserId, out var userId))
            {
                return Unauthorized(new { message = "Bạn cần đăng nhập để chỉnh sửa bài viết!" });
            }

            try
            {
                await postService.DeletePostAsync(id, userId);
                return Ok(new { message = "Xóa bài viết thành công!" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
