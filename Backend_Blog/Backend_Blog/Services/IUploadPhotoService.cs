namespace Backend_Blog.Services
{
    public interface IUploadPhotoService
    {
        Task<string?> UploadPhotoAsync(IFormFile? file, string folder = "blog_img");
    }
}
