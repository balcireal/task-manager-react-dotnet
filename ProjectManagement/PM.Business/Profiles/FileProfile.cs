using AutoMapper;
using TaskManagement.Model.Dtos.File;
using TaskManagement.Model.Entities;
using FileEntity = TaskManagement.Model.Entities.File;

namespace TaskManagement.Business.Profiles
{
    public class FileProfile : Profile
    {
        public FileProfile()
        {
            CreateMap<FileEntity, FileGetDto>();
            CreateMap<FilePostDto, FileEntity>();
            CreateMap<FilePutDto, FileEntity>();

        }
    }
}
