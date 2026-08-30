using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_Blog.Migrations
{
    /// <inheritdoc />
    public partial class add_isBookmarked : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isBookmarked",
                table: "Posts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isBookmarked",
                table: "Posts");
        }
    }
}
