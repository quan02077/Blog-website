using Microsoft.EntityFrameworkCore;
using Backend_Blog.Entities;
namespace Backend_Blog.Data
{
    public class MyBlogContext: DbContext
    {
        public MyBlogContext(DbContextOptions<MyBlogContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Post>()
                .HasOne(p => p.Author)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Lập trình" },
                new Category { Id = 2, Name = "Công nghệ" },
                new Category { Id = 3, Name = "Đời sống" }
            );
        }
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Post> Posts { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
    }
}
