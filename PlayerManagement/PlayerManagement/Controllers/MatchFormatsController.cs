using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayerManagement.Data;
using PlayerManagement.DTOs;

namespace PlayerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchFormatsController : ControllerBase
    {
        private readonly AppDbContext db;

        public MatchFormatsController(AppDbContext db)
        {
            this.db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MatchFormatMini>>> GetAllMatchFormats()
        {
            var matchFormats = await db.MatchFormats
                .Select(mf => new MatchFormatMini
                {
                    MatchFormatId= mf.MatchFormatId,
                    FormatName = mf.FormatName
                }).ToListAsync();
            return Ok(matchFormats);
        }
        
    }
}
