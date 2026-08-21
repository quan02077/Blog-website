using Backend_Blog.Data;
using Backend_Blog.Entities;
using Backend_Blog.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_Blog.Services
{
    public class PostService(MyBlogContext context) : IPostService
    {
        public async Task<PostDto> CreatePostAsync(WritePostDTO request, Guid userId)
        {
            var user = await context.Users.FindAsync(userId);
            if (user is null)
            {
                throw new KeyNotFoundException("Không tìm thấy người dùng!");
            }

            var post = new Post
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Content = request.Content,
                CoverImage = request.CoverImage,
                Tags = request.Tags,
                CategoryId = request.CategoryId,
                AuthorId = userId,
                CreatedAt = DateTime.UtcNow,
                IsDeleted = false
            };

            context.Posts.Add(post);
            await context.SaveChangesAsync();

            string? categoryName = null;
            if (request.CategoryId.HasValue)
            {
                var category = await context.Categories.FindAsync(request.CategoryId.Value);
                categoryName = category?.Name;
            }

            return new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                CoverImage = post.CoverImage,
                Tags = post.Tags,
                CreatedAt = post.CreatedAt,
                AuthorId = user.Id,
                AuthorName = user.Username,
                CategoryId = post.CategoryId,
                CategoryName = categoryName
            };
        }

        public async Task<List<PostDto>> GetAllPostsAsync()
        {
            var posts = await context.Posts
                .Where(p => !p.IsDeleted)
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new PostDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    CoverImage = p.CoverImage,
                    CreatedAt = p.CreatedAt,
                    AuthorId = p.AuthorId,
                    AuthorName = p.Author.Username,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category != null ? p.Category.Name : null,
                    Tags = p.Tags
                })
                .ToListAsync();

            return posts; 
        }

        public async Task<PostDto?> GetPostByIdAsync(Guid postId)
        {
            var post = await context.Posts
                .Include(p => p.Author)
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == postId && !p.IsDeleted);

            if (post is null)
            {
                return null;
            }

            return new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                CoverImage = post.CoverImage,
                Tags = post.Tags,
                CreatedAt = post.CreatedAt,
                AuthorId = post.AuthorId,
                AuthorName = post.Author.Username,
                CategoryId = post.CategoryId,
                CategoryName = post.Category?.Name
            };
        }
    }
}
