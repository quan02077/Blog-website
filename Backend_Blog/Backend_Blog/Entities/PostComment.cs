using System.ComponentModel.DataAnnotations;

namespace Backend_Blog.Entities
{
    public class PostComment
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        [MaxLength(1000)]
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Guid PostId { get; set; }
        public Post? Post { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}
