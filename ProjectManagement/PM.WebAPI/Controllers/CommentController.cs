using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Business.Interfaces;
using TaskManagement.Model.Dtos.Comment;

namespace TaskManagement.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : BaseController
    {
        private readonly ICommentBs _commentBs;

        public CommentController(ICommentBs commentBs)
        {
            _commentBs = commentBs;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var response = await _commentBs.GetByIdAsync(id);
            return await SendResponseAsync(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetComments()
        {
            var response = await _commentBs.GetCommentsAsync();
            return await SendResponseAsync(response);
        }

        [HttpGet("getbycontent")]
        public async Task<IActionResult> GetAddressesByCity([FromQuery] string city)
        {
            var response = await _commentBs.GetCommentsByContentAsync(city);
            return await SendResponseAsync(response);
        }

        [HttpGet("getbycreatetime")]
        public async Task<IActionResult> GetCommentsByCreateTime([FromQuery] DateTime baslangic, [FromQuery] DateTime bitis)
        {
            var response = await _commentBs.GetCommentsByCreateTimeAsync(baslangic, bitis, "Urun", "IslemTur", "Magaza", "Calisan");
            return await SendResponseAsync(response);
        }

        [HttpPost]
        public async Task<IActionResult> SaveNewComment([FromBody] CommentPostDto dto)
        {
            var response = await _commentBs.InsertAsync(dto);

            if (response.ErrorMessages != null && response.ErrorMessages.Count > 0)
            {
                return await SendResponseAsync(response);
            }
            else
                return CreatedAtAction(nameof(GetById), new { id = response.Data.CommentId }, response.Data);

        }

        [HttpPut]
        public async Task<IActionResult> UpdateComment([FromBody] CommentPutDto dto)
        {
            var response = await _commentBs.UpdateAsync(dto);

            return await SendResponseAsync(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var response = await _commentBs.DeleteAsync(id);

            return await SendResponseAsync(response);
        }
    }
}
