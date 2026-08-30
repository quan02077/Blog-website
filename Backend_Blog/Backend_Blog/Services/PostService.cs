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
                ReadTime = request.ReadTime,
                IsDraft = request.IsDraft,
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
                CategoryName = categoryName,
                IsDraft = post.IsDraft
            };
        }

        public async Task<IEnumerable<PostDto>> GetMyDraftsAsync(Guid userId, string? searchTerm, string? category, string? sortBy)
        {
            var query = context.Posts.AsQueryable();

            query = query.Where(p => p.IsDraft && p.AuthorId == userId);

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(p => p.Title.Contains(searchTerm));
            }

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(p => p.Category != null && p.Category.Name == category);
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                query = sortBy.ToLower() switch
                {
                    "az" => query.OrderBy(p => p.Title),
                    "za" => query.OrderByDescending(p => p.Title),
                    "latest" => query.OrderByDescending(p => p.CreatedAt),
                    "oldest" => query.OrderBy(p => p.CreatedAt),
                    _ => query
                };
            }

            return await query.Select(d => new PostDto
                            {
                                Id = d.Id,
                                Title = d.Title,
                                Summary = d.Summary,
                                Content = d.Content,
                                CoverImage = d.CoverImage,
                                ReadTime = d.ReadTime,
                                CategoryName = d.Category != null ? d.Category.Name : null,
                                AuthorId = d.AuthorId,
                                CreatedAt= d.CreatedAt,
                                UpdatedAt = d.UpdatedAt,
                                AuthorName = d.Author != null ? d.Author.Username : null,
                                AuthorAvatar = d.Author != null ? d.Author.Avatar : null,
                                Tags = d.Tags,
                                IsDraft = d.IsDraft
                            }).ToListAsync();
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

        public async Task<IEnumerable<PostDto>> GetAllPostsAsync(string? searchTerm, int? year)
        {
            var query = context.Posts.AsQueryable();

            query = query.Where(p => !p.IsDraft);

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(p => p.Title.Contains(searchTerm));
            }

            if(year.HasValue)
            {
                query = query.Where(p => p.CreatedAt.Year == year.Value);
            }

            query = query.OrderByDescending(p => p.CreatedAt);

            return await query.Select(post => new PostDto
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
                IsDraft = post.IsDraft
            }).ToListAsync();
        }

        public async Task<PostDto> GetPostByIdAsync(Guid id)
        {
            var post = await context.Posts
                .Include(p => p.Author)    
                .Include(p => p.Category)  
                .FirstOrDefaultAsync(p => p.Id == id);

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
                IsDraft = post.IsDraft
            };
        }

        public async Task<PostDto> UpdatePostAsync(Guid id, WritePostDTO request, Guid userId)
        {
            var post = await context.Posts
                            .Include(p => p.Category)
                            .FirstOrDefaultAsync(p => p.Id == id );

            if(post == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bài viết này!!");
            }

            if (post.AuthorId != userId) 
            {
                throw new UnauthorizedAccessException("Bạn không có quyền chỉnh sửa bài viết này!");
            }


            if (request.CoverImage != null)
            {
                string sercureUrl = await uploadPhoto.UploadPhotoAsync(request.CoverImage, "blog_posts");
                post.CoverImage = sercureUrl;
            }

            post.Title = request.Title;
            post.Content = request.Content;
            post.Summary = request.Summary;
            post.Tags = request.Tags;
            post.ReadTime = request.ReadTime;
            post.CategoryId = request.CategoryId;
            post.IsDraft = request.IsDraft;
            post.UpdatedAt = DateTime.UtcNow;

            await context.SaveChangesAsync();

            string? categoryName = null;
            if (post.CategoryId.HasValue)
            {
                var category = await context.Categories.FindAsync(post.CategoryId.Value);
                if (category != null)
                {
                    categoryName = category.Name;
                }
            }

            var user = await context.Users.FindAsync(userId);
            return new PostDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                Summary = post.Summary,
                CoverImage = post.CoverImage,
                Tags = post.Tags,
                CreatedAt = post.CreatedAt,
                UpdatedAt = post.UpdatedAt,
                ReadTime = post.ReadTime,
                AuthorId = post.AuthorId,
                AuthorName = user?.Username ?? "Tác giả",
                AuthorAvatar = user?.Avatar,
                CategoryId = post.CategoryId,
                CategoryName = categoryName,
                IsDraft = post.IsDraft
            };
        }

        public async Task DeletePostAsync(Guid id, Guid userId) 
        {
            var post = await context.Posts
                .FirstOrDefaultAsync(p => p.Id == id && p.AuthorId == userId);

            if (post == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bài viết này hoặc bạn không có quyền xóa!");
            }
            context.Posts.Remove(post);
            await context.SaveChangesAsync();
        }

    }
}
