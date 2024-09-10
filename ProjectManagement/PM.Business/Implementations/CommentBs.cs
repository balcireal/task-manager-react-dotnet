using AutoMapper;
using Infrastructure.Utilities;
using Microsoft.AspNetCore.Http;
using TaskManagement.Business.CustomExceptions;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.Interfaces;
using TaskManagement.Model.Dtos.Comment;
using TaskManagement.Model.Entities;
using BadRequestException = TaskManagement.Business.CustomExceptions.BadRequestException;

namespace TaskManagement.Business.Implementations
{
    public class CommentBs : ICommentBs
    {
        private readonly ICommentRepository _repo;
        private readonly IMapper _mapper;

        public CommentBs(ICommentRepository repo,IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<ApiResponse<NoData>> DeleteAsync(int id)
        {
            if (id <= 0)
                throw new BadRequestException("id değeri 0 dan büyük olmalıdır");

            var address = await _repo.GetByIdAsync(id);

            await _repo.DeleteAsync(address);

            return ApiResponse<NoData>.Success(StatusCodes.Status200OK);
        }

        public async Task<ApiResponse<CommentGetDto>> GetByIdAsync(int addressId, params string[] includeList)
        {
            if (addressId <= 0)
                throw new BadRequestException("id değeri 0 dan büyük olmalıdır");

            var address = await _repo.GetByIdAsync(addressId, includeList);
            if (address != null)
            {
                var dto = _mapper.Map<CommentGetDto>(address);
                return ApiResponse<CommentGetDto>.Success(StatusCodes.Status200OK, dto);
            }

            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<List<CommentGetDto>>> GetCommentsAsync(params string[] includeList)
        {
            var comments = await _repo.GetAllAsync(includeList: includeList);
            if (comments.Count > 0)
            {
                var returnList = _mapper.Map<List<CommentGetDto>>(comments);
                var response = ApiResponse<List<CommentGetDto>>.Success(StatusCodes.Status200OK, returnList);
                return response;
            }
            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<List<CommentGetDto>>> GetCommentsByContentAsync(string content, params string[] includeList)
        {
            if (content.Length > 1)
                throw new BadRequestException("Yorum en az 2 harften oluşmalıdır");

            var comments = await _repo.GetByContentAsync(content, includeList);
            if (comments != null && comments.Count > 0)
            {
                var returnList = _mapper.Map<List<CommentGetDto>>(comments);
                return ApiResponse<List<CommentGetDto>>.Success(StatusCodes.Status200OK, returnList);
            }
            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<List<CommentGetDto>>> GetCommentsByCreateTimeAsync(DateTime baslangicTarihi, DateTime bitisTarihi, params string[] includeList)
        {
            var islem = await _repo.GetByCreateTimeAsync(baslangicTarihi, bitisTarihi);
            if (islem.Count > 0 && islem != null)
            {
                var returnList = _mapper.Map<List<CommentGetDto>>(islem);
                return ApiResponse<List<CommentGetDto>>.Success(StatusCodes.Status200OK, returnList);
            }
            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<Comment>> InsertAsync(CommentPostDto dto)
        {
            if (dto == null)
                throw new BadRequestException("Kaydedilecek yorum bilgisi yollamalısınız");


            var comment = _mapper.Map<Comment>(dto);

            var insertedComment = await _repo.InsertAsync(comment);
            return ApiResponse<Comment>.Success(StatusCodes.Status201Created, insertedComment);
        }

        public async Task<ApiResponse<NoData>> UpdateAsync(CommentPutDto dto)
        {
            if (dto == null)
                throw new BadRequestException("Güncellenecek yorum bilgisi yollamalısınız");

            if (dto.Content.Length > 1)
                throw new BadRequestException("Yorum içeriği en az 2 harften oluşmalıdır.");
            var comment = _mapper.Map<Comment>(dto);

            await _repo.UpdateAsync(comment);
            return ApiResponse<NoData>.Success(StatusCodes.Status200OK);
        }
    }
}
