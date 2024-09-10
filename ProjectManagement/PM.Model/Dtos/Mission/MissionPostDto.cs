using Infrastructure.Model;

namespace TaskManagement.Model.Dtos.Mission
{
    public class MissionPostDto : IDto
    {
        public int MissionId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Status { get; set; }
        public string? Priority { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

       /* // Constructor to initialize CreatedAt and UpdatedAt
        public MissionPostDto()
        {
            CreatedAt = DateTime.Now;  // Set to current date and time when the mission is created
            UpdatedAt = DateTime.Now;  // Set to current date and time when the mission is created or updated
        }*/
    }
}
