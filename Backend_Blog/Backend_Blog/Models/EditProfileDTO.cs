namespace Backend_Blog.Models
{
    public class EditProfileDTO
    {
        public IFormFile? Avatar { get; set; }
        public string? Username { get; set; }
        public string? Email  { get; set; }
        public string? Password { get; set; }
        public string? Bio { get; set; }
    }
}
