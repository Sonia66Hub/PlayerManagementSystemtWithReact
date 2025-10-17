using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayerManagement.Data;
using PlayerManagement.DTOs;

namespace PlayerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BloodGroupsController : ControllerBase
    {
        private readonly AppDbContext db;

        public BloodGroupsController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BloodGroupMini>>> GetAllBloodGroups()
        {
            var data = await db.BloodGroups
                .Select(b => new BloodGroupMini
                {
                    BloodGroupId = b.BloodGroupId,
                    GroupName = b.GroupName
                })
                .ToListAsync();

            return Ok(data);
        }
    }
}
