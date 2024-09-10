using Infrastructure.Model;

namespace TaskManagement.Model.Entities
{
    public class Comment : IEntity
    {
        public int CommentId { get; set; }
        public int MissionId { get; set; }
        public int UserId { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public Mission? Mission { get; set; }
        public User? User { get; set; }

    }
}
