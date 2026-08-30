using Backend_Blog.Models;

namespace Backend_Blog.Services
{
    public interface IPostService
    {
        Task<IEnumerable<PostDto>> GetAllPostsAsync(string? searchTerm, int? year);
        Task<IEnumerable<PostDto>> GetMyDraftsAsync(Guid userId, string? searchTerm, string? category, string? sortBy);
        Task<List<CategoryDTO>> GetAllCategoriesAsync();
        Task<PostDto?> GetPostByIdAsync(Guid postId);
        Task<PostDto> CreatePostAsync(WritePostDTO request, Guid userId);
        Task<PostDto> UpdatePostAsync(Guid id, WritePostDTO request, Guid userId);
        Task DeletePostAsync(Guid id, Guid userId);
    }
}
