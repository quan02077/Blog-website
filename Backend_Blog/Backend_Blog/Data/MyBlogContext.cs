using Microsoft.EntityFrameworkCore;
namespace Backend_Blog.Data
{
    public class MyBlogContext: DbContext
    {
        public MyBlogContext(DbContextOptions<MyBlogContext> options) : base(options) { }
        public DbSet<Entities.User> Users { get; set; } = null!;
    }
}
