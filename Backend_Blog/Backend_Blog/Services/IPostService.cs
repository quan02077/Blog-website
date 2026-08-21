using Backend_Blog.Models;

namespace Backend_Blog.Services
{
    public interface IPostService
    {
        Task<List<PostDto>> GetAllPostsAsync();
        Task<List<CategoryDTO>> GetAllCategoriesAsync();
        Task<PostDto?> GetPostByIdAsync(Guid postId);
        Task<PostDto> CreatePostAsync(WritePostDTO request, Guid userId);
        Task<string> GetAvatarAuthorAsync(Guid authorId);
    }
}
