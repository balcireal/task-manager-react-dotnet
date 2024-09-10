using AutoMapper;
using Infrastructure.Utilities;
using Microsoft.AspNetCore.Http;
using TaskManagement.Business.CustomExceptions;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.EF.Repositories;
using TaskManagement.DataAccess.Interfaces;
using TaskManagement.Model.Dtos.Mission;
using TaskManagement.Model.Entities;
using BadRequestException = TaskManagement.Business.CustomExceptions.BadRequestException;

namespace TaskManagement.Business.Implementations
{
    public class MissionBs : IMissionBs
    {
        private readonly IMissionRepository _repo;
        private readonly IMapper _mapper;

        public MissionBs(IMissionRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }


        public async Task<ApiResponse<List<MissionGetDto>>> GetMissionsByMonthAsync(int year, int month, params string[] includeList)
        {
            var missions = await _repo.GetMissionsByMonthAsync(year, month, includeList);
            var missionDtos = _mapper.Map<List<MissionGetDto>>(missions);

            return ApiResponse<List<MissionGetDto>>.Success(200, missionDtos);
        }




        public async Task<ApiResponse<NoData>> DeleteAsync(int id)
        {
            if (id <= 0)
                throw new BadRequestException("id değeri 0 dan büyük olmalıdır");

            var mission = await _repo.GetByIdAsync(id);

            await _repo.DeleteAsync(mission);

            return ApiResponse<NoData>.Success(StatusCodes.Status200OK);
        }

        public async Task<ApiResponse<MissionGetDto>> GetByIdAsync(int missionId, params string[] includeList)
        {
            if (missionId <= 0)
                throw new BadRequestException("id değeri 0 dan büyük olmalıdır");

            var mission = await _repo.GetByIdAsync(missionId, includeList);
            if (mission != null)
            {
                var dto = _mapper.Map<MissionGetDto>(mission);
                return ApiResponse<MissionGetDto>.Success(StatusCodes.Status200OK, dto);
            }

            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<List<MissionGetDto>>> GetMissionsAsync(params string[] includeList)
        {
            var missions = await _repo.GetAllAsync(includeList: includeList);
            if (missions.Count > 0)
            {
                var returnList = _mapper.Map<List<MissionGetDto>>(missions);
                var response = ApiResponse<List<MissionGetDto>>.Success(StatusCodes.Status200OK, returnList);
                return response;
            }
            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<List<MissionGetDto>>> GetMissionsByTitleAsync(string title, params string[] includeList)
        {
            if (title.Length < 2)
                throw new BadRequestException("Başlık en az 2 harften oluşmalıdır");

            var missions = await _repo.GetByTitleAsync(title, includeList);
            if (missions != null && missions.Count > 0)
            {
                var returnList = _mapper.Map<List<MissionGetDto>>(missions);
                return ApiResponse<List<MissionGetDto>>.Success(StatusCodes.Status200OK, returnList);
            }
            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<List<MissionGetDto>>> GetMissionsByAsgnUserIdAsync(int asgnUserId, params string[] includeList)
        {
            if (asgnUserId <= 0)
                throw new BadRequestException("Atanan Kullanıcı ID'si 0'dan büyük olmalıdır");

            var mission = await _repo.GetByAsgnUserIdAsync(asgnUserId, includeList);
            if (mission != null)
            {
                var dto = _mapper.Map<List<MissionGetDto>>(mission);
                return ApiResponse<List<MissionGetDto>>.Success(StatusCodes.Status200OK, dto);
            }
            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<Mission>> InsertAsync(MissionPostDto dto)
        {
            if (dto == null)
                throw new BadRequestException("Kaydedilecek misyon bilgisi yollamalısınız");

            if (dto.Title.Length < 2)
                throw new BadRequestException("Başlık en az 2 harften oluşmalıdır");

            var mission = _mapper.Map<Mission>(dto);

            var insertedMission = await _repo.InsertAsync(mission);
            return ApiResponse<Mission>.Success(StatusCodes.Status201Created, insertedMission);
        }

        public async Task<ApiResponse<NoData>> UpdateAsync(MissionPutDto dto)
        {
            if (dto == null)
                throw new BadRequestException("Güncellenecek misyon bilgisi yollamalısınız");

            if (dto.Title.Length < 2)
                throw new BadRequestException("Başlık en az 2 harften oluşmalıdır");

            var mission = _mapper.Map<Mission>(dto);

            await _repo.UpdateAsync(mission);
            return ApiResponse<NoData>.Success(StatusCodes.Status200OK);
        }

        public async Task<ApiResponse<YearlyMissionBreakdownDto>> GetMissionsByYearAsync(int year, params string[] includeList)
        {
            var missions = await _repo.GetMissionsByYearAsync(year, includeList);
            if (missions == null || missions.Count == 0)
            {
                throw new NotFoundException("No missions found for the specified year.");
            }

            var completedTasks = missions.Count(m => m.Status == "Tamamlanmış");
            var pendingTasks = missions.Count(m => m.Status == "Tamamlanmamış");
            var totalTasks = completedTasks + pendingTasks;

            var result = new YearlyMissionBreakdownDto
            {
                CompletedTasks = completedTasks,
                PendingTasks = pendingTasks,
            };

            return ApiResponse<YearlyMissionBreakdownDto>.Success(StatusCodes.Status200OK, result);
        }

        public async Task<ApiResponse<List<MonthlyProgressDto>>> GetMissionsByMonthlyProgressAsync(int year, params string[] includeList)
        {
            var missions = await _repo.GetMissionsByYearAsync(year);
            if (missions == null || missions.Count == 0)
            {
                throw new NotFoundException("No missions found for the specified year.");
            }

            var monthlyProgress = Enumerable.Range(1, 12)
                .Select(month => new MonthlyProgressDto
                {
                    Month = month,
                    TasksCompleted = missions.Count(m => m.CreatedAt.Year == year && m.CreatedAt.Month == month && m.Status == "Tamamlanmış"),
                    TasksPending = missions.Count(m => m.CreatedAt.Year == year && m.CreatedAt.Month == month && m.Status == "Tamamlanmamış")
                })
                .ToList();

            return ApiResponse<List<MonthlyProgressDto>>.Success(StatusCodes.Status200OK, monthlyProgress);
        }

        
    }
}
