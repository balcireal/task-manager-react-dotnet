using AutoMapper;
using TaskManagement.Model.Dtos.Mission;
using TaskManagement.Model.Dtos.User;
using TaskManagement.Model.Entities;

namespace TaskManagement.Business.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserGetDto>();
            CreateMap<UserPostDto, User>();
            CreateMap<UserPutDto, User>();
        }
    }
}
