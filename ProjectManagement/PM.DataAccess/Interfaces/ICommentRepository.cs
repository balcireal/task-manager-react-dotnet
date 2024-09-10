using Infrastructure.DataAccess.Interfaces;
using System.Diagnostics.Metrics;
using TaskManagement.Model.Entities;

namespace TaskManagement.DataAccess.Interfaces
{
    public interface ICommentRepository : IBaseRepository<Comment>
    {
        Task<Comment> GetByIdAsync(int commentId, params string[] includeList);
        Task<List<Comment>> GetByContentAsync(string content, params string[] includeList);
        Task<List<Comment>> GetByCreateTimeAsync(DateTime baslangicTarihi, DateTime bitisTarihi, params string[] includeList);
    }
}
