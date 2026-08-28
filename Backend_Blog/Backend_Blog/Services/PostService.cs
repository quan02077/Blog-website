using Backend_Blog.Data;
using Backend_Blog.Entities;
using Backend_Blog.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_Blog.Services
{
    public class PostService(MyBlogContext context, IUploadPhotoService uploadPhoto) : IPostService
    {
        public async Task<PostDto> CreatePostAsync(WritePostDTO request, Guid userId)
        {
            var user = await context.Users.FindAsync(userId);
            if (user is null)
            {
                throw new KeyNotFoundException("Không tìm thấy người dùng!");
            }

            string sercureUrl = await uploadPhoto.UploadPhotoAsync(request.CoverImage, "blog_posts");
            var post = new Post
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Content = request.Content,
                Summary = request.Summary,
                CoverImage = sercureUrl,
                Tags = request.Tags,
                CategoryId = request.CategoryId,
                AuthorId = userId,
                CreatedAt = DateTime.UtcNow,
                IsDeleted = false,
                ReadTime = request.ReadTime 
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
                Summary = post.Summary,
                CoverImage = post.CoverImage,
                Tags = post.Tags,
                CreatedAt = post.CreatedAt,
                ReadTime = post.ReadTime,

                AuthorId = user.Id,
                AuthorName = user.Username,
                AuthorAvatar = user.Avatar, 

                CategoryId = post.CategoryId,
                CategoryName = categoryName
            };
        }


        public async Task<List<CategoryDTO>> GetAllCategoriesAsync()
        {
            var categories = await context.Categories
                .Select(c => new CategoryDTO
                {
                    Id = c.Id,
                    Name = c.Name
                })
                .ToListAsync();

            return categories;
        }

        public async Task<List<PostDto>> GetAllPostsAsync()
        {
            var posts = await context.Posts
                .Include(p => p.Author)      
                .Include(p => p.Category)    
                .Where(p => !p.IsDeleted)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return posts.Select(post => new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                Summary = post.Summary,
                CoverImage = post.CoverImage,
                Tags = post.Tags,
                CreatedAt = post.CreatedAt,
                ReadTime = post.ReadTime,

                AuthorId = post.AuthorId,
                AuthorName = post.Author != null ? post.Author.Username : "Tác giả",
                AuthorAvatar = post.Author != null ? post.Author.Avatar : null, 

                CategoryId = post.CategoryId,
                CategoryName = post.Category != null ? post.Category.Name : null
            }).ToList();
        }

        public Task<List<PostDto>> GetMyDraftsAsync(Guid userId)
        {
            throw new NotImplementedException();
        }

        public async Task<PostDto> GetPostByIdAsync(Guid id)
        {
            var post = await context.Posts
                .Include(p => p.Author)    
                .Include(p => p.Category)  
                .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

            if (post == null) return null;

            return new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                Summary = post.Summary,
                CoverImage = post.CoverImage,
                Tags = post.Tags,
                CreatedAt = post.CreatedAt,
                ReadTime = post.ReadTime,

                AuthorId = post.AuthorId,
                AuthorName = post.Author != null ? post.Author.Username : "Tác giả",
                AuthorAvatar = post.Author != null ? post.Author.Avatar : null, 

                CategoryId = post.CategoryId,
                CategoryName = post.Category != null ? post.Category.Name : null,
            };
        }

    }
}
