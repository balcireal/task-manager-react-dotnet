using Infrastructure.DataAccess.Implementations.EF;
using TaskManagement.DataAccess.EF.Contexts;
using TaskManagement.DataAccess.Interfaces;
using TaskManagement.Model.Entities;


namespace TaskManagement.DataAccess.EF.Repositories
{
    public class CommentRepository : BaseRepository<Comment, TaskManagementDbContext>, ICommentRepository
    {
        public async Task<List<Comment>> GetByContentAsync(string name, params string[] includeList)
        {
            return await GetAllAsync(cmt => cmt.Content.Contains(name), includeList);
        }

        public async Task<List<Comment>> GetByCreateTimeAsync(DateTime baslangicTarihi, DateTime bitisTarihi, params string[] includeList)
        {
            return await GetAllAsync(cmt => cmt.CreatedAt >= baslangicTarihi && cmt.CreatedAt <= bitisTarihi, includeList);
        }

        public async Task<Comment> GetByIdAsync(int commentId, params string[] includeList)
        {
            return await GetAsync(cmt => cmt.CommentId == commentId, includeList);
        }
    }
}
