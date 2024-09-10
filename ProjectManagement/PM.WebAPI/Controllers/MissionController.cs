using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Business.Interfaces;
using TaskManagement.Model.Dtos.Mission;

namespace TaskManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionController : BaseController
    {
        private readonly IMissionBs _missionBs;

        public MissionController(IMissionBs missionBs)
        {
            _missionBs = missionBs;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var response = await _missionBs.GetByIdAsync(id);
            return await SendResponseAsync(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetMissions()
        {
            var response = await _missionBs.GetMissionsAsync();
            return await SendResponseAsync(response);
        }

        [HttpGet("byTitle")]
        public async Task<IActionResult> GetMissionsByTitle([FromQuery] string title)
        {
            var response = await _missionBs.GetMissionsByTitleAsync(title);
            return await SendResponseAsync(response);
        }

        [HttpGet("byUserId/{asgnUserId}")]
        public async Task<IActionResult> GetMissionsByAsgnUserId([FromRoute] int asgnUserId)
        {
            var response = await _missionBs.GetMissionsByAsgnUserIdAsync(asgnUserId);
            return await SendResponseAsync(response);
        }

        [HttpPost]
        public async Task<IActionResult> SaveNewMission([FromBody] MissionPostDto dto)
        {
            var response = await _missionBs.InsertAsync(dto);

            if (response.ErrorMessages != null && response.ErrorMessages.Count > 0)
            {
                return await SendResponseAsync(response);
            }
            else
                return CreatedAtAction(nameof(GetById), new { id = response.Data.MissionId }, response.Data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateMission([FromBody] MissionPutDto dto)
        {
            var response = await _missionBs.UpdateAsync(dto);

            return await SendResponseAsync(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMission(int id)
        {
            var response = await _missionBs.DeleteAsync(id);

            return await SendResponseAsync(response);
        }


        [HttpGet("byMonth")]
        public async Task<IActionResult> GetMissionsByMonth([FromQuery] int year, [FromQuery] int month)
        {
            var response = await _missionBs.GetMissionsByMonthAsync(year, month);
            return await SendResponseAsync(response);
        }

        [HttpGet("byYear")]
        public async Task<IActionResult> GetMissionsByYear([FromQuery] int year)
        {
            if (year <= 0)
            {
                return BadRequest("Invalid year parameter");
            }

            var response = await _missionBs.GetMissionsByYearAsync(year);
            return await SendResponseAsync(response);
        }

        [HttpGet("monthlyProgress")]
        public async Task<IActionResult> GetMonthlyProgress([FromQuery] int year)
        {
            if (year <= 0)
            {
                return BadRequest("Invalid year parameter");
            }

            var response = await _missionBs.GetMissionsByMonthlyProgressAsync(year);
            return await SendResponseAsync(response);
        }


    }
}
