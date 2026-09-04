using System.ComponentModel.DataAnnotations;

namespace Backend_Blog.Models
{
    public class WriteCommentDTO
    {
        [Required]
        public string Content { get; set; } = string.Empty;
    }
}
