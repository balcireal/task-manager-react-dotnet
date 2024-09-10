using Infrastructure.Model;

namespace TaskManagement.Model.Entities
{
    public class Mission : IEntity
    {
        public int MissionId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Status { get; set; }
        public string? Priority { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<Comment>? Comments { get; set; }
        public User? User { get; set; }
        public List<File>? Files { get; set; }
    }
}
