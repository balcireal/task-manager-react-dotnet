using Infrastructure.Utilities;
using System.Net;
using TaskManagement.Model.Dtos.User;
using TaskManagement.Model.Entities;

namespace TaskManagement.Business.Interfaces
{
    public interface IUserBs
    {
        Task<ApiResponse<List<UserGetDto>>> GetUsersAsync(params string[] includeList);
        Task<ApiResponse<List<UserGetDto>>> GetUsersByUserNameAsync(string name, params string[] includeList);
        Task<ApiResponse<List<UserGetDto>>> GetUsersByRoleAsync(string role, params string[] includeList);
        Task<ApiResponse<UserGetDto>> GetByIdAsync(int userId, params string[] includeList);
        Task<ApiResponse<User>> InsertAsync(UserPostDto dto);
        Task<ApiResponse<NoData>> DeleteAsync(int id);
        Task<ApiResponse<NoData>> UpdateAsync(UserPutDto entity);
        Task<ApiResponse<UserGetDto>> LogIn(string userName, string password, params string[] includeList);
    }
}
