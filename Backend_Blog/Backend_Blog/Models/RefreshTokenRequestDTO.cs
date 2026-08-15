namespace Backend_Blog.Models
{
    public class RefreshTokenRequestDTO
    {
        public Guid UserId { get; set; }
        public required string RefreshToken { get; set; }
    }
}
