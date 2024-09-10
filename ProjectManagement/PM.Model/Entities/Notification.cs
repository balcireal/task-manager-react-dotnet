using Infrastructure.Model;

namespace TaskManagement.Model.Entities
{
    public class Notification : IEntity
    {
        public int NotificationId { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; }
        public Boolean IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
        public User? User { get; set; }
    }
}
