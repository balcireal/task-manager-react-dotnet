using AutoMapper;
using TaskManagement.Model.Dtos.Notification;
using Notify = TaskManagement.Model.Entities.Notification;

namespace TaskManagement.Business.Profiles
{
    public class NotificationProfile : Profile
    {
        public NotificationProfile()
        {
            CreateMap<Notify, NotificationGetDto>();
            CreateMap<NotificationPostDto, Notify>();
            CreateMap<NotificationPutDto, Notify>();
        }
    }
}
