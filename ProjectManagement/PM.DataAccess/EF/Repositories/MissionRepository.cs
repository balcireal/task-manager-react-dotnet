using Infrastructure.DataAccess.Implementations.EF;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.DataAccess.EF.Contexts;
using TaskManagement.DataAccess.Interfaces;
using TaskManagement.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace TaskManagement.DataAccess.EF.Repositories
{
    public class MissionRepository : BaseRepository<Mission, TaskManagementDbContext>, IMissionRepository
    {
        public async Task<List<Mission>> GetByAsgnUserIdAsync(int asgnUserId, params string[] includeList)
        {
            return await GetAllAsync(miss => miss.UserId == asgnUserId, includeList);
        }

        public async Task<Mission> GetByIdAsync(int missionId, params string[] includeList)
        {
            return await GetAsync(miss => miss.MissionId == missionId, includeList);
        }

        public async Task<List<Mission>> GetByTitleAsync(string title, params string[] includeList)
        {
            return await GetAllAsync(miss => miss.Title.Contains(title), includeList);
        }

        public async Task<List<Mission>> GetMissionsByMonthAsync(int year, int month, params string[] includeList) // Yeni Metot
        {
            return await GetAllAsync(miss => miss.CreatedAt.Year == year && miss.CreatedAt.Month == month, includeList);
        }

        public async Task<List<Mission>> GetMissionsByYearAsync(int year, params string[] includeList)
        {
            return await GetAllAsync(miss => miss.CreatedAt.Year == year, includeList);
        }


    }
}
