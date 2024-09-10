using Infrastructure.Utilities;
using System.Net;
using TaskManagement.Model.Dtos.Notification;
using TaskManagement.Model.Entities;

namespace TaskManagement.Business.Interfaces
{
    public interface INotificationBs
    {
        Task<ApiResponse<List<NotificationGetDto>>> GetNotificationsAsync(params string[] includeList);
        Task<ApiResponse<List<NotificationGetDto>>> GetNotificationsByCreateTimeAsync(DateTime baslangicTarihi, DateTime bitisTarihi, params string[] includeList);
        Task<ApiResponse<NotificationGetDto>> GetByIdAsync(int notificationId, params string[] includeList);
        Task<ApiResponse<Notification>> InsertAsync(NotificationPostDto dto);
        Task<ApiResponse<NoData>> DeleteAsync(int id);
        Task<ApiResponse<NoData>> UpdateAsync(NotificationPutDto entity);

        Task<ApiResponse<List<NotificationGetDto>>> GetNotificationsByUserIdAsync(int userId, params string[] includeList);

        Task<ApiResponse<NoData>> MarkAsReadAsync(int notificationId, params string[] includeList);
    }
}
