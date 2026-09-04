using Backend_Blog.Models;

namespace Backend_Blog.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string? Bio { get; set; }
        public string? Avatar { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public string? ResetToken { get; set; }
        public DateTime? ResetTokenExpiryTime { get; set; }

        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public ICollection<PostsLike> LikedPosts { get; set; } = new List<PostsLike>();

    }
}
