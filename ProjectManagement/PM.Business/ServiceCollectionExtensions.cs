using Microsoft.Extensions.DependencyInjection;
using TaskManagement.Business.Implementations;
using TaskManagement.Business.Interfaces;
using TaskManagement.Business.Profiles;
using TaskManagement.DataAccess.EF.Repositories;
using TaskManagement.DataAccess.Interfaces;

namespace TaskManagement.Business
{
    public static class ServiceCollectionExtensions
    {
        public static void AddBusinessServices(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(CommentProfile));

            services.AddScoped<ICommentBs, CommentBs>();
            services.AddScoped<ICommentRepository, CommentRepository>();

            services.AddScoped<IFileBs, FileBs>();
            services.AddScoped<IFileRepository, FileRepository>();

            services.AddScoped<IMissionBs, MissionBs>();
            services.AddScoped<IMissionRepository, MissionRepository>();

            services.AddScoped<IUserBs, UserBs>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<INotificationBs, NotificationBs>();
            services.AddScoped<INotificationRepository, NotificationRepository>();


            
        }
    }
}
