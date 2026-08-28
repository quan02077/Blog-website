using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace Backend_Blog.Services
{
    public class UploadPhotoService(Cloudinary cloudinary) : IUploadPhotoService
    {
        public async Task<string?> UploadPhotoAsync(IFormFile? file, string folder = "blog_img")
        {
            if (file == null || file.Length == 0) return null;

            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams() 
            { 
                File = new FileDescription(file.FileName, stream),
                Folder = folder
            };
            var uploadResult = await cloudinary.UploadAsync(uploadParams);
            if (uploadResult.Error != null)
            {
                throw new Exception($"Cloudinary error: {uploadResult.Error.Message}");
            }

            return uploadResult.SecureUrl?.ToString();
        }
    }
}
