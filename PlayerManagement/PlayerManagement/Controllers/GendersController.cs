using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayerManagement.Data;
using PlayerManagement.DTOs;

namespace PlayerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GendersController : ControllerBase
    {
        private readonly AppDbContext db;

        public GendersController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenderMini>>> GetAllGenders()
        {
            var data = await db.Genders
                .Select(g => new GenderMini
                {
                    GenderId = g.GenderId,
                    GenderName = g.GenderName
                })
                .ToListAsync();

            return Ok(data);
        }
    }
}
