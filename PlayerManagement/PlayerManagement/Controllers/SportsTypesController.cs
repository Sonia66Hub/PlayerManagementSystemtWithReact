using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayerManagement.Data;
using PlayerManagement.DTOs;

namespace PlayerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SportsTypesController : ControllerBase
    {
        private readonly AppDbContext db;

        public SportsTypesController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SportsTypeMini>>> GetAllSportsTypes()
        {
            var data = await db.SportsTypes
                .Select(s => new SportsTypeMini
                {
                    SportsTypeId = s.SportsTypeId,
                    TypeName = s.TypeName
                })
                .ToListAsync();

            return Ok(data);
        }
    }
}
