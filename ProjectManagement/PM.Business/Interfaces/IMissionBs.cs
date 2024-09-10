using System.Threading.Tasks;
using System.Collections.Generic;
using TaskManagement.Model.Dtos.Mission;
using TaskManagement.Model.Entities;
using TaskManagement.Business.Interfaces;
using Infrastructure.Utilities;

namespace TaskManagement.Business.Interfaces
{
    public interface IMissionBs
    {
        Task<ApiResponse<List<MissionGetDto>>> GetMissionsAsync(params string[] includeList);
        Task<ApiResponse<List<MissionGetDto>>> GetMissionsByTitleAsync(string title, params string[] includeList);
        Task<ApiResponse<MissionGetDto>> GetByIdAsync(int missionId, params string[] includeList);
        Task<ApiResponse<List<MissionGetDto>>> GetMissionsByAsgnUserIdAsync(int asgnUserId, params string[] includeList);
        Task<ApiResponse<List<MissionGetDto>>> GetMissionsByMonthAsync(int year, int month, params string[] includeList); // Yeni Metot
        Task<ApiResponse<YearlyMissionBreakdownDto>> GetMissionsByYearAsync(int year, params string[] includeList); // New method

        Task<ApiResponse<List<MonthlyProgressDto>>> GetMissionsByMonthlyProgressAsync(int year, params string[] includeList);
        Task<ApiResponse<Mission>> InsertAsync(MissionPostDto dto);
        Task<ApiResponse<NoData>> DeleteAsync(int id);
        Task<ApiResponse<NoData>> UpdateAsync(MissionPutDto dto);
    }
}
