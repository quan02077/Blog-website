using System.Text.Json.Serialization;

namespace Backend_Blog.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        [JsonIgnore]

        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
}
