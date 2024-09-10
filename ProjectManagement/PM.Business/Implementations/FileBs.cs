using AutoMapper;
using Infrastructure.Utilities;
using TaskManagement.Business.CustomExceptions;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.Interfaces;
using TaskManagement.Model.Dtos.File;
using TaskManagement.Model.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace TaskManagement.Business.Implementations
{
    public class FileBs : IFileBs
    {
        private readonly IFileRepository _repo;
        private readonly IMapper _mapper;

        public FileBs(IFileRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<ApiResponse<NoData>> DeleteAsync(int id)
        {
            if (id <= 0)
                throw new BadRequestException("id değeri 0 dan büyük olmalıdır");

            var file = await _repo.GetByIdAsync(id);

            await _repo.DeleteAsync(file);

            return ApiResponse<NoData>.Success(StatusCodes.Status200OK);
        }

        public async Task<ApiResponse<FileGetDto>> GetByIdAsync(int id, params string[] includeList)
        {
            if (id <= 0)
                throw new BadRequestException("id değeri 0 dan büyük olmalıdır");

            var file = await _repo.GetByIdAsync(id, includeList);
            if (file != null)
            {
                var dto = _mapper.Map<FileGetDto>(file);
                return ApiResponse<FileGetDto>.Success(StatusCodes.Status200OK, dto);
            }

            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<List<FileGetDto>>> GetFilesAsync(params string[] includeList)
        {
            var files = await _repo.GetAllAsync(includeList: includeList);
            if (files.Count > 0)
            {
                var returnList = _mapper.Map<List<FileGetDto>>(files);
                var response = ApiResponse<List<FileGetDto>>.Success(StatusCodes.Status200OK, returnList);
                return response;
            }
            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<List<FileGetDto>>> GetFilesByMissionAsync(int missionId, params string[] includeList)
        {
            var files = await _repo.GetByMissionIdAsync(missionId, includeList);
            if (files != null && files.Count > 0)
            {
                var returnList = _mapper.Map<List<FileGetDto>>(files);
                return ApiResponse<List<FileGetDto>>.Success(StatusCodes.Status200OK, returnList);
            }
            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<List<FileGetDto>>> GetFilesByUploadTimeAsync(DateTime baslangicTarihi, DateTime bitisTarihi, params string[] includeList)
        {
            var files = await _repo.GetByUploadTimeAsync(baslangicTarihi, bitisTarihi);
            if (files != null && files.Count > 0)
            {
                var returnList = _mapper.Map<List<FileGetDto>>(files);
                return ApiResponse<List<FileGetDto>>.Success(StatusCodes.Status200OK, returnList);
            }
            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<Model.Entities.File>> InsertAsync(FilePostDto dto)
        {
            if (dto == null)
                throw new BadRequestException("Kaydedilecek dosya bilgisi yollamalısınız");

            if (string.IsNullOrEmpty(dto.FilePath))
                throw new BadRequestException("Dosya yolu boş olamaz");

            var file = _mapper.Map<Model.Entities.File>(dto);

            var insertedFile = await _repo.InsertAsync(file);
            return ApiResponse<Model.Entities.File>.Success(StatusCodes.Status201Created, insertedFile);
        }

        public async Task<ApiResponse<NoData>> UpdateAsync(FilePutDto dto)
        {
            if (dto == null)
                throw new BadRequestException("Güncellenecek dosya bilgisi yollamalısınız");

            if (string.IsNullOrEmpty(dto.FilePath))
                throw new BadRequestException("Dosya yolu boş olamaz");

            var file = _mapper.Map<Model.Entities.File>(dto);

            await _repo.UpdateAsync(file);
            return ApiResponse<NoData>.Success(StatusCodes.Status200OK);
        }

        public async Task<string> GetFilePathByIdAsync(int id)
        {
            if (id <= 0)
                throw new BadRequestException("id değeri 0 dan büyük olmalıdır");

            var filePath = await _repo.GetFilePathByIdAsync(id);
            if (filePath == null)
                throw new NotFoundException("Dosya bulunamadı");

            return filePath;
        }
    }
}
