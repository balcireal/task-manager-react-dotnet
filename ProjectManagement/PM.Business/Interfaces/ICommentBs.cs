using Infrastructure.Utilities;
using System.Net;
using TaskManagement.Model.Dtos.Comment;
using TaskManagement.Model.Entities;

namespace TaskManagement.Business.Interfaces
{
    public interface ICommentBs
    {
        Task<ApiResponse<List<CommentGetDto>>> GetCommentsAsync(params string[] includeList);
        Task<ApiResponse<List<CommentGetDto>>> GetCommentsByContentAsync(string content, params string[] includeList);
        Task<ApiResponse<List<CommentGetDto>>> GetCommentsByCreateTimeAsync(DateTime baslangicTarihi, DateTime bitisTarihi, params string[] includeList);
        Task<ApiResponse<CommentGetDto>> GetByIdAsync(int addressId, params string[] includeList);
        Task<ApiResponse<Comment>> InsertAsync(CommentPostDto dto);
        Task<ApiResponse<NoData>> DeleteAsync(int id);
        Task<ApiResponse<NoData>> UpdateAsync(CommentPutDto entity);
    }
}
