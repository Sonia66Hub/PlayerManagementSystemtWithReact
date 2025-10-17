using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayerManagement.Data;
using PlayerManagement.Models;

namespace PlayerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluationCategoriesController : ControllerBase
    {
        private readonly AppDbContext db;

        public EvaluationCategoriesController(AppDbContext db)
        {
            this.db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EvaluationCategory>>> GetEvaluationCategories()
        {
            return await db.EvaluationCategories.ToListAsync();
        }
    }
}
