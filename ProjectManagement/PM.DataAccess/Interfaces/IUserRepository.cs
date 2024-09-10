using Infrastructure.DataAccess.Interfaces;
using System.Diagnostics.Metrics;
using TaskManagement.Model.Entities;

namespace TaskManagement.DataAccess.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User> GetByIdAsync(int userId, params string[] includeList);
        Task<List<User>> GetByUserNameAsync(string name, params string[] includeList);
        Task<List<User>> GetByRoleAsync(string role, params string[] includeList);
        Task<User> GetByUserNameAndPasswordAsync(string userName, string password, params string[] includeList);

    }
}
