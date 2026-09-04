namespace Backend_Blog.Models
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Content { get; set; }
        public string? Summary { get; set; }
        public string? CoverImage { get; set; }
        public string? Tags { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Guid AuthorId { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public int ReadTime { get; internal set; }
        public string? AuthorAvatar { get; set; }
        public bool IsDraft { get; set; } = false;
        public bool IsBookmarked { get; set; }
        public int ViewCount { get; set; } = 0;
        public int LikesCount { get; set; } = 0; 
        public bool IsLiked { get; set; } = false;
        public int CommentsCount { get; set; } = 0; 

    }
}
