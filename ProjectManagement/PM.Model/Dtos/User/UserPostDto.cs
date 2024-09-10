using Infrastructure.Model;

namespace TaskManagement.Model.Dtos.User
{
    public class UserPostDto : IDto
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
