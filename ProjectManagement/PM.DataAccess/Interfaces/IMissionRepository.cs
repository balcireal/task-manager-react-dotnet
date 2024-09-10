using System.Threading.Tasks;
using System.Collections.Generic;
using Infrastructure.DataAccess.Interfaces;
using TaskManagement.Model.Entities;

namespace TaskManagement.DataAccess.Interfaces
{
    public interface IMissionRepository : IBaseRepository<Mission>
    {
        Task<Mission> GetByIdAsync(int missionId, params string[] includeList);
        Task<List<Mission>> GetByTitleAsync(string title, params string[] includeList);
        Task<List<Mission>> GetByAsgnUserIdAsync(int asgnUserId, params string[] includeList);
        Task<List<Mission>> GetMissionsByMonthAsync(int year, int month, params string[] includeList); // Yeni Metot

        Task<List<Mission>> GetMissionsByYearAsync(int year, params string[] includeList); // Yeni Metot
    }
}
