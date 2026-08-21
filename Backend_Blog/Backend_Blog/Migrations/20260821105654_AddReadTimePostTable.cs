using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_Blog.Migrations
{
    /// <inheritdoc />
    public partial class AddReadTimePostTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReadTime",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReadTime",
                table: "Posts");
        }
    }
}
