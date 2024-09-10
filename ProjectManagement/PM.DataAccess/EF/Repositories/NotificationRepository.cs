using Infrastructure.DataAccess.Implementations.EF;
using TaskManagement.DataAccess.EF.Contexts;
using TaskManagement.DataAccess.Interfaces;
using NotifyEntity = TaskManagement.Model.Entities.Notification;

namespace TaskManagement.DataAccess.EF.Repositories
{
    public class NotificationRepository : BaseRepository<NotifyEntity, TaskManagementDbContext>, INotificationRepository
    {
        public async Task<List<NotifyEntity>> GetByCreateTimeAsync(DateTime baslangicTarihi, DateTime bitisTarihi, params string[] includeList)
        {
            return await GetAllAsync(not => not.CreatedAt >= baslangicTarihi && not.CreatedAt <= bitisTarihi, includeList);
        }

        public async Task<NotifyEntity> GetByIdAsync(int notificationId, params string[] includeList)
        {
            return await GetAsync(not => not.NotificationId == notificationId,includeList);
        }

        public async Task<List<NotifyEntity>> GetByUserIdAsync(int userId, params string[] includeList)
        {
            return await GetAllAsync(not => not.UserId == userId, includeList);
        }

        public async Task MarkAsReadAsync(int notificationId, params string[] includeList)
        {
            var notification = await GetByIdAsync(notificationId);
            if (notification != null)
            {
                notification.IsRead = true;
                await UpdateAsync(notification); 
            }
        }
    }
}
