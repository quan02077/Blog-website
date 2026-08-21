using Backend_Blog.Data;
using Backend_Blog.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_Blog.Services
{
    public class PostService(MyBlogContext context) : IPostService
    {
        public async Task<List<PostDto>> GetAllPostsAsync()
        {
            var posts = await context.Posts
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new PostDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    CoverImage = p.CoverImage,
                    CreatedAt = p.CreatedAt,
                    AuthorName = p.Author.Username
                })
                .ToListAsync();

            return posts; 
        }
    }
}
