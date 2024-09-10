using AutoMapper;
using TaskManagement.Model.Dtos.Comment;
using TaskManagement.Model.Entities;

namespace TaskManagement.Business.Profiles
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, CommentGetDto>();
            CreateMap<CommentPostDto, Comment>();
            CreateMap<CommentPutDto, Comment>();
        }
    }
}
