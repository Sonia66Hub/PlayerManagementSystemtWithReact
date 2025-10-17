using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayerManagement.Data;
using PlayerManagement.DTOs;

namespace PlayerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluationTypesController : ControllerBase
    {
        private readonly AppDbContext db;

        public EvaluationTypesController(AppDbContext db)
        {
            this.db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EvaluationTypeReadDto>>> GetEvaluationTypes()
        {
            var evaluationTypes = await db.EvaluationTypes.ToListAsync();
            var evaluationTypeReadDtos = evaluationTypes.Select(e => new EvaluationTypeReadDto
            {
                EvaluationTypeId = e.EvaluationTypeId,
                TypeName = e.TypeName
            }).ToList();

            return Ok(evaluationTypeReadDtos);
        }
    }
}
