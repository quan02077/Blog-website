namespace Backend_Blog.Models
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? CoverImage { get; set; }
        public DateTime CreatedAt { get; set; }
        public string AuthorName { get; set; } = string.Empty; 
    }
}
