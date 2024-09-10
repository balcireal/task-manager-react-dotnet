using Infrastructure.Utilities;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Business.Interfaces;
using TaskManagement.Model.Dtos.User;
using TaskManagement.WebAPI.Controllers;

namespace FoodDelivery.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : BaseController
    {
        //private readonly IConfiguration _configuration;
        private readonly IUserBs _userBs;

        public AuthenticationController(IUserBs userBs, IConfiguration configuration)
        {
            _userBs = userBs;
           // _configuration = configuration;
        }

        #region SWAGGER DOC
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResponse<UserGetDto>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse<NoData>))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ApiResponse<NoData>))]
        #endregion
        [HttpGet("login")]
        public async Task<IActionResult> LogIn([FromQuery] string userName, [FromQuery] string password)
        {
            var response = await _userBs.LogIn(userName, password);
            return await SendResponseAsync(response);
        }
    }
}
