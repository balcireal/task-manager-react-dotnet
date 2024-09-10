using Infrastructure.Model;

namespace TaskManagement.Model.Dtos.File
{
    public class FilePutDto : IDto
    {
        public int FileId { get; set; }
        public int MissionId { get; set; }
        public string? FilePath { get; set; }
        public DateTime UploadedAt { get; set; }
    }
}
