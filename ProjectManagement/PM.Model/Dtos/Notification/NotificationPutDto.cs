using Infrastructure.Model;

namespace TaskManagement.Model.Dtos.Notification
{
    public class NotificationPutDto : IDto
    {
        public int NotificationId { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; }
        public Boolean IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
