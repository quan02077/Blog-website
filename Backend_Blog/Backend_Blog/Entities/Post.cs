using System.ComponentModel.DataAnnotations;

namespace Backend_Blog.Entities
{
    public class Post
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public string? CoverImage { get; set; }
        public string? Summary { get; set; }

        public string? Tags { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public int ReadTime { get; set; }

        public Guid AuthorId { get; set; }
        public User Author { get; set; } = null!;
        public bool IsDraft { get; set; } = false;
        public bool isBookmarked { get; set; } = false;
        public int ViewCount { get; set; } = 0;

        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
        public ICollection<PostsLike> PostsLikes { get; set; } = new List<PostsLike>();


    }
}
