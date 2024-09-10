using Infrastructure.Model;

namespace TaskManagement.Model.Dtos.Comment
{
    public class CommentPostDto : IDto
    {
        /*public int MissionId { get; set; }*/
        public int UserId { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
