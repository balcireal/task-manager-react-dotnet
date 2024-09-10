using Infrastructure.DataAccess.Interfaces;
using System.Diagnostics.Metrics;
using TaskManagement.Model.Entities;

namespace TaskManagement.DataAccess.Interfaces
{
    public interface INotificationRepository : IBaseRepository<Notification>
    {
        Task<Notification> GetByIdAsync(int notificationId, params string[] includeList);
        Task<List<Notification>> GetByCreateTimeAsync(DateTime baslangicTarihi, DateTime bitisTarihi, params string[] includeList);
        Task<List<Notification>> GetByUserIdAsync(int userId, params string[] includeList);

        Task MarkAsReadAsync(int notificationId, params string[] includeList);
    }
}
