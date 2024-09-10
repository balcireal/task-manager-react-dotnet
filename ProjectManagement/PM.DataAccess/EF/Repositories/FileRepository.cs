using Infrastructure.DataAccess.Implementations.EF;
using TaskManagement.DataAccess.EF.Contexts;
using TaskManagement.DataAccess.Interfaces;
using FileEntity = TaskManagement.Model.Entities.File;

namespace TaskManagement.DataAccess.EF.Repositories
{
    public class FileRepository : BaseRepository<FileEntity, TaskManagementDbContext>, IFileRepository
    {
        public async Task<FileEntity> GetByIdAsync(int fileId, params string[] includeList)
        {
            return await GetAsync(file => file.FileId == fileId, includeList);
        }

        public async Task<List<FileEntity>> GetByMissionIdAsync(int missionId, params string[] includeList)
        {
            return await GetAllAsync(file => file.MissionId == missionId, includeList)
                ;
        }

        public async Task<List<FileEntity>> GetByUploadTimeAsync(DateTime baslangicTarihi, DateTime bitisTarihi, params string[] includeList)
        {
            return await GetAllAsync(file => file.UploadedAt >= baslangicTarihi && file.UploadedAt <= bitisTarihi, includeList);
        }

        public async Task<string> GetFilePathByIdAsync(int fileId ,params string[] includeList)
        {
            var file = await GetByIdAsync(fileId);
            return file?.FilePath;
        }
    }
}
