using Microsoft.AspNetCore.Mvc;
using TaskManagement.Business.Interfaces;
using TaskManagement.Model.Dtos.File;
using System.Threading.Tasks;

namespace TaskManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : BaseController
    {
        private readonly IFileBs _fileBs;

        public FileController(IFileBs fileBs)
        {
            _fileBs = fileBs;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var response = await _fileBs.GetByIdAsync(id);
            return await SendResponseAsync(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetFiles()
        {
            var response = await _fileBs.GetFilesAsync();
            return await SendResponseAsync(response);
        }

        [HttpGet("byMission/{missionId}")]
        public async Task<IActionResult> GetFilesByMission([FromRoute] int missionId)
        {
            var response = await _fileBs.GetFilesByMissionAsync(missionId);
            return await SendResponseAsync(response);
        }

        [HttpGet("getbyuploadtime")]
        public async Task<IActionResult> GetFilesByUploadTime([FromQuery] DateTime baslangic, [FromQuery] DateTime bitis)
        {
            var response = await _fileBs.GetFilesByUploadTimeAsync(baslangic, bitis);
            return await SendResponseAsync(response);
        }

        [HttpPost]
        public async Task<IActionResult> SaveNewFile([FromBody] FilePostDto dto)
        {
            var response = await _fileBs.InsertAsync(dto);

            if (response.ErrorMessages != null && response.ErrorMessages.Count > 0)
            {
                return await SendResponseAsync(response);
            }
            else
                return CreatedAtAction(nameof(GetById), new { id = response.Data.FileId }, response.Data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateFile([FromBody] FilePutDto dto)
        {
            var response = await _fileBs.UpdateAsync(dto);
            return await SendResponseAsync(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(int id)
        {
            var response = await _fileBs.DeleteAsync(id);
            return await SendResponseAsync(response);
        }

        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadFile(int id)
        {
            var fileResponse = await _fileBs.GetByIdAsync(id);

            if (fileResponse.StatusCode < 200 || fileResponse.StatusCode >= 300 || fileResponse.Data == null)
                return NotFound(fileResponse.ErrorMessages);


            var filePath = fileResponse.Data.FilePath;

            if (!System.IO.File.Exists(filePath))
                return NotFound("Dosya bulunamadı.");

            var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            var contentType = "application/octet-stream"; 

            return File(fileBytes, contentType, Path.GetFileName(filePath));
        }

    }
}
