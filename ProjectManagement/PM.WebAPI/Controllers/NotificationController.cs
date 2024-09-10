using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Business.Interfaces;
using TaskManagement.Model.Dtos.Notification;

namespace TaskManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : BaseController
    {
        private readonly INotificationBs _notificationBs;

        public NotificationController(INotificationBs notificationBs)
        {
            _notificationBs = notificationBs;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var response = await _notificationBs.GetByIdAsync(id);
            return await SendResponseAsync(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetNotifications()
        {
            var response = await _notificationBs.GetNotificationsAsync();
            return await SendResponseAsync(response);
        }

        [HttpGet("getbycreatetime")]
        public async Task<IActionResult> GetNotificationsByCreateTime([FromQuery] DateTime baslangic, [FromQuery] DateTime bitis)
        {
            var response = await _notificationBs.GetNotificationsByCreateTimeAsync(baslangic, bitis);
            return await SendResponseAsync(response);
        }

        [HttpPost]
        public async Task<IActionResult> SaveNewNotification([FromBody] NotificationPostDto dto)
        {
            var response = await _notificationBs.InsertAsync(dto);

            if (response.ErrorMessages != null && response.ErrorMessages.Count > 0)
            {
                return await SendResponseAsync(response);
            }
            else
                return CreatedAtAction(nameof(GetById), new { id = response.Data.NotificationId }, response.Data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateNotification([FromBody] NotificationPutDto dto)
        {
            var response = await _notificationBs.UpdateAsync(dto);
            return await SendResponseAsync(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var response = await _notificationBs.DeleteAsync(id);
            return await SendResponseAsync(response);
        }


        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetNotificationsByUserId([FromRoute] int userId)
        {
            var response = await _notificationBs.GetNotificationsByUserIdAsync(userId);
            return await SendResponseAsync(response);
        }

        [HttpPut("mark-as-read/{notificationId}")]
        public async Task<IActionResult> MarkAsRead([FromRoute] int notificationId)
        {
            var response = await _notificationBs.MarkAsReadAsync(notificationId);
            return await SendResponseAsync(response);
        }


    }
}
