using Infrastructure.Model;

namespace TaskManagement.Model.Dtos.Comment
{
    public class CommentGetDto : IDto
    {
        public int CommentId { get; set; }
        public int MissionId { get; set; }
        public int UserId { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
