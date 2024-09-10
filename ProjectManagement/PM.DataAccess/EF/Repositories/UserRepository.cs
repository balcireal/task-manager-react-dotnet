using Infrastructure.DataAccess.Implementations.EF;
using TaskManagement.DataAccess.EF.Contexts;
using TaskManagement.DataAccess.Interfaces;
using UserEntity = TaskManagement.Model.Entities.User;

namespace TaskManagement.DataAccess.EF.Repositories
{
    public class UserRepository : BaseRepository<UserEntity, TaskManagementDbContext>, IUserRepository
    {
        public async Task<UserEntity> GetByIdAsync(int userId, params string[] includeList)
        {
            return await GetAsync(usr => usr.UserId == userId, includeList);
        }
        public async Task<List<UserEntity>> GetByUserNameAsync(string name, params string[] includeList)
        {
            return await GetAllAsync(usr => usr.Username.Contains(name), includeList);
        }
        public async Task<List<UserEntity>> GetByRoleAsync(string role, params string[] includeList)
        {
            return await GetAllAsync(usr => usr.Role.Contains(role), includeList);
        }

        public async Task<UserEntity> GetByUserNameAndPasswordAsync(string userName, string password, params string[] includeList)
        {
            return await GetAsync(x => x.Username == userName && x.Password == password, includeList);
        }
    }
}
