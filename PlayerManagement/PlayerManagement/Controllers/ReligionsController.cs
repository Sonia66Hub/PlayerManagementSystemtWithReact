using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayerManagement.Data;
using PlayerManagement.DTOs;

namespace PlayerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReligionsController : ControllerBase
    {
        private readonly AppDbContext db;

        public ReligionsController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReligionMini>>> GetAllReligions()
        {
            var data = await db.Religions
                .Select(r => new ReligionMini
                {
                    ReligionId = r.ReligionId,
                    ReligionName = r.ReligionName
                })
                .ToListAsync();

            return Ok(data);
        }
    }
}
