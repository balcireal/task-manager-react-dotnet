using Infrastructure.DataAccess.Interfaces;
using System.Diagnostics.Metrics;
using FileEntity = TaskManagement.Model.Entities.File;

namespace TaskManagement.DataAccess.Interfaces
{
    public interface IFileRepository : IBaseRepository<FileEntity>
    {
        Task<FileEntity> GetByIdAsync(int fileId, params string[] includeList);
        Task<List<FileEntity>> GetByUploadTimeAsync(DateTime baslangicTarihi, DateTime bitisTarihi, params string[] includeList);

         Task<List<FileEntity>> GetByMissionIdAsync(int missionId, params string[] includeList);

        Task<string> GetFilePathByIdAsync(int fileId,params string[] includeList);
    }
}
