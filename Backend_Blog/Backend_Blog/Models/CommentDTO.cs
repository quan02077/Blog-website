namespace Backend_Blog.Models
{
    public class CommentDTO
    {
        public Guid Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public Guid UserId { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public string? AuthorAvatar { get; set; }
    }
}
