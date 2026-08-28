namespace Backend_Blog.Models
{
    public class WritePostDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Summary { get; set; }
        public IFormFile? CoverImage { get; set; }
        public string Content { get; set; } = string.Empty;
        public string? Tags { get; set; }
        public int? CategoryId { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public int ReadTime { get; set; }
    }
}
