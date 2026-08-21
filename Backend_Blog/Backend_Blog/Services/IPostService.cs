using Backend_Blog.Models;

namespace Backend_Blog.Services
{
    public interface IPostService
    {
        Task<List<PostDto>> GetAllPostsAsync();
    }
}
