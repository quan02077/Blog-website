namespace Backend_Blog.Models
{
    public class ResetPassworDTO
    {
        public string? email {  get; set; }
        public string? token { get; set; }
        public string? newPassword { get; set; }
    }
}
