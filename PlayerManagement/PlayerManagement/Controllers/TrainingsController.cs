using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayerManagement.Data;
using PlayerManagement.DTOs;
using PlayerManagement.Models;

namespace PlayerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingsController : ControllerBase
    {
        private readonly AppDbContext db;

        public TrainingsController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrainingReadDto>>> GetTrainings()
        {
            var trainings = await db.Training.ToListAsync();
            var trainingReadDtos = trainings.Select(t=> new TrainingReadDto
            {
                TrainingId = t.TrainingId,
                TrainingName = t.TrainingName
            }).ToList();

            return Ok(trainingReadDtos);
        }
    }
}
