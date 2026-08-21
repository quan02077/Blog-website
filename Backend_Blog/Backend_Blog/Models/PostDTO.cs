namespace Backend_Blog.Models
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Content { get; set; }
        public string? CoverImage { get; set; }
        public string? Tags { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid AuthorId { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public int Readtime { get; set; }
    }
}
