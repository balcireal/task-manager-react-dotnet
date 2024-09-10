using Infrastructure.Model;

namespace TaskManagement.Model.Entities
{
    public class File : IEntity
    {
        public int FileId { get; set; }
        public int MissionId { get; set; }
        public string? FilePath { get; set; }
        public DateTime UploadedAt { get; set; }
        public Mission? Mission { get; set; }
    }
}
