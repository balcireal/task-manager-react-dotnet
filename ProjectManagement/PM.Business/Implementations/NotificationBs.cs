using AutoMapper;
using Infrastructure.Utilities;
using Microsoft.AspNetCore.Http;
using TaskManagement.Business.CustomExceptions;
using TaskManagement.Business.Interfaces;
using TaskManagement.DataAccess.EF.Repositories;
using TaskManagement.DataAccess.Interfaces;
using TaskManagement.Model.Dtos.Notification;
using TaskManagement.Model.Entities;
using BadRequestException = TaskManagement.Business.CustomExceptions.BadRequestException;

namespace TaskManagement.Business.Implementations
{
    public class NotificationBs : INotificationBs
    {
        private readonly INotificationRepository _repo;
        private readonly IMapper _mapper;

        public NotificationBs(INotificationRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<ApiResponse<NoData>> DeleteAsync(int id)
        {
            if (id <= 0)
                throw new BadRequestException("id değeri 0 dan büyük olmalıdır");

            var notification = await _repo.GetByIdAsync(id);

            await _repo.DeleteAsync(notification);

            return ApiResponse<NoData>.Success(StatusCodes.Status200OK);
        }

        public async Task<ApiResponse<NotificationGetDto>> GetByIdAsync(int notificationId, params string[] includeList)
        {
            if (notificationId <= 0)
                throw new BadRequestException("id değeri 0 dan büyük olmalıdır");

            var notification = await _repo.GetByIdAsync(notificationId, includeList);
            if (notification != null)
            {
                var dto = _mapper.Map<NotificationGetDto>(notification);
                return ApiResponse<NotificationGetDto>.Success(StatusCodes.Status200OK, dto);
            }

            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<List<NotificationGetDto>>> GetNotificationsAsync(params string[] includeList)
        {
            var notifications = await _repo.GetAllAsync(includeList: includeList);
            if (notifications.Count > 0)
            {
                var returnList = _mapper.Map<List<NotificationGetDto>>(notifications);
                var response = ApiResponse<List<NotificationGetDto>>.Success(StatusCodes.Status200OK, returnList);
                return response;
            }
            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<List<NotificationGetDto>>> GetNotificationsByCreateTimeAsync(DateTime baslangicTarihi, DateTime bitisTarihi, params string[] includeList)
        {
            var notifications = await _repo.GetByCreateTimeAsync(baslangicTarihi, bitisTarihi, includeList);
            if (notifications.Count > 0 && notifications != null)
            {
                var returnList = _mapper.Map<List<NotificationGetDto>>(notifications);
                return ApiResponse<List<NotificationGetDto>>.Success(StatusCodes.Status200OK, returnList);
            }
            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<Notification>> InsertAsync(NotificationPostDto dto)
        {
            if (dto == null)
                throw new BadRequestException("Kaydedilecek bildirim bilgisi yollamalısınız");

            var notification = _mapper.Map<Notification>(dto);

            var insertedNotification = await _repo.InsertAsync(notification);
            return ApiResponse<Notification>.Success(StatusCodes.Status201Created, insertedNotification);
        }

        public async Task<ApiResponse<NoData>> UpdateAsync(NotificationPutDto dto)
        {
            if (dto == null)
                throw new BadRequestException("Güncellenecek bildirim bilgisi yollamalısınız");

            var notification = _mapper.Map<Notification>(dto);

            await _repo.UpdateAsync(notification);
            return ApiResponse<NoData>.Success(StatusCodes.Status200OK);
        }


        public async Task<ApiResponse<List<NotificationGetDto>>> GetNotificationsByUserIdAsync(int userId, params string[] includeList)
        {
            var notifications = await _repo.GetByUserIdAsync(userId, includeList);
            if (notifications.Count > 0)
            {
                var returnList = _mapper.Map<List<NotificationGetDto>>(notifications);
                return ApiResponse<List<NotificationGetDto>>.Success(StatusCodes.Status200OK, returnList);
            }
            throw new NotFoundException("İçerik Bulunamadı");
        }

        public async Task<ApiResponse<NoData>> MarkAsReadAsync(int notificationId, params string[] includeList)
        {
            if (notificationId <= 0)
                throw new BadRequestException("Notification ID must be greater than 0");

            try
            {
                await _repo.MarkAsReadAsync(notificationId);
                return ApiResponse<NoData>.Success(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return ApiResponse<NoData>.Fail(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


    }
}
