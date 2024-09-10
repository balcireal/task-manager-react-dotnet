using Infrastructure.Utilities;
using TaskManagement.Model.Dtos.File;
using FileEntity = TaskManagement.Model.Entities.File;

namespace TaskManagement.Business.Interfaces
{
    public interface IFileBs
    {
        Task<ApiResponse<List<FileGetDto>>> GetFilesAsync(params string[] includeList);

        Task<ApiResponse<List<FileGetDto>>> GetFilesByUploadTimeAsync(DateTime baslangicTarihi, DateTime bitisTarihi, params string[] includeList);

        Task<ApiResponse<FileGetDto>> GetByIdAsync(int addressId, params string[] includeList);
        Task<ApiResponse<FileEntity>> InsertAsync(FilePostDto dto);
        Task<ApiResponse<NoData>> DeleteAsync(int id);
        Task<ApiResponse<NoData>> UpdateAsync(FilePutDto entity);
        Task<ApiResponse<List<FileGetDto>>> GetFilesByMissionAsync(int missionId, params string[] includeList);
        Task<string> GetFilePathByIdAsync(int id);
    }
}
