using AutoMapper;
using TaskManagement.Model.Dtos.Mission;
using TaskManagement.Model.Entities;

namespace TaskManagement.Business.Profiles
{
    public class MissionProfile : Profile
    {
        public MissionProfile()
        {
            CreateMap<Mission, MissionGetDto>();
            CreateMap<MissionPostDto, Mission>();
            CreateMap<MissionPutDto, Mission>();
        }
    }
}
