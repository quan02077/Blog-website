using Backend_Blog.Models;

namespace Backend_Blog.Services
{
    public interface IPostService
    {
        Task<List<PostDto>> GetAllPostsAsync();
        Task<IEnumerable<PostDto>> GetMyDraftsAsync(Guid userId);
        Task<List<CategoryDTO>> GetAllCategoriesAsync();
        Task<PostDto?> GetPostByIdAsync(Guid postId);
        Task<PostDto> CreatePostAsync(WritePostDTO request, Guid userId);
        Task<PostDto> UpdatePostAsync(Guid id, WritePostDTO request, Guid userId);
        Task DeleteDraftAsync(Guid id, Guid userId);
    }
}
