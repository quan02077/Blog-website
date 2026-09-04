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

            modelBuilder.Entity<PostsLike>().HasKey(pl => new { pl.PostId, pl.UserId });

            modelBuilder.Entity<PostsLike>()
                .HasOne(pl => pl.Post)
                .WithMany(p => p.PostsLikes)
                .HasForeignKey(pl => pl.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PostsLike>()
                .HasOne(pl => pl.User)
                .WithMany(u => u.LikedPosts)
                .HasForeignKey(pl => pl.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PostComment>().HasKey(c => new { c.PostId, c.UserId });

            modelBuilder.Entity<PostComment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.PostComment)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PostComment>()
                .HasOne(c => c.User)
                .WithMany(p => p.CommentPost)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PostBookmark>().HasKey(pb => new { pb.PostId, pb.UserId });

            modelBuilder.Entity<PostBookmark>()
                .HasOne(pb => pb.Post)
                .WithMany(p => p.PostBookmarks)
                .HasForeignKey(pb => pb.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PostBookmark>()
                .HasOne(pb => pb.User)  
                .WithMany(u => u.PostBookmarks)
                .HasForeignKey(pb => pb.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Post> Posts { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<PostsLike> PostsLikes { get; set; } = null!;
        public DbSet<PostComment> PostComments { get; set; } = null!;
        public DbSet<PostBookmark> PostBookmarks { get; set; } = null!;

    }
}
