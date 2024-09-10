using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Business.Interfaces;
using TaskManagement.Model.Dtos.User;

namespace TaskManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserBs _userBs;

        public UserController(IUserBs userBs)
        {
            _userBs = userBs;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var response = await _userBs.GetByIdAsync(id);
            return await SendResponseAsync(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var response = await _userBs.GetUsersAsync();
            return await SendResponseAsync(response);
        }

        [HttpGet("getbyusername")]
        public async Task<IActionResult> GetUsersByUserName([FromQuery] string username)
        {
            var response = await _userBs.GetUsersByUserNameAsync(username);
            return await SendResponseAsync(response);
        }

        [HttpGet("getbyrole")]
        public async Task<IActionResult> GetUsersByRole([FromQuery] string role)
        {
            var response = await _userBs.GetUsersByRoleAsync(role);
            return await SendResponseAsync(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> SaveNewUser([FromBody] UserPostDto dto)
        {
            var response = await _userBs.InsertAsync(dto);

            if (response.ErrorMessages != null && response.ErrorMessages.Count > 0)
            {
                return await SendResponseAsync(response);
            }
            else
            {
                return CreatedAtAction(nameof(GetById), new { id = response.Data.UserId }, response.Data);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UserPutDto dto)
        {
            var response = await _userBs.UpdateAsync(dto);
            return await SendResponseAsync(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var response = await _userBs.DeleteAsync(id);
            return await SendResponseAsync(response);
        }
    }
}
