﻿using Infrastructure.Model;

namespace TaskManagement.Model.Dtos.File
{
    public class FileGetDto : IDto
    {
        public int MissionId { get; set; }
        public string? FilePath { get; set; }
        public DateTime UploadedAt { get; set; }
    }
}
