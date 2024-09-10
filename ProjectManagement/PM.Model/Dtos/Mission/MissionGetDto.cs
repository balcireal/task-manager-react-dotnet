using Infrastructure.Model;

namespace TaskManagement.Model.Dtos.Mission
{
    public class MissionGetDto : IDto
    {
        public int MissionId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Status { get; set; }
        public string? Priority { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        //public int CompletedTasks { get; set; }
        //public int PendingTasks { get; set; }
        //public int OtherTasks { get; set; }
    }
}
