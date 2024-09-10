using Infrastructure.Model;

namespace TaskManagement.Model.Entities
{
    public class User : IEntity
    { 
        public int UserId { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string Role { get; set; } = "Kullanıcı";
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<Comment>? Comments { get; set; }
        public List<Mission>? Missions { get; set; }
        public List<Notification>? Notifications { get; set; }
    }
}
