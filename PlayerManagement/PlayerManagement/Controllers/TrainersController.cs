using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PlayerManagement.Data;
using PlayerManagement.DTOs;
using PlayerManagement.Models;

namespace PlayerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public TrainersController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrainerReadDto>>> GetTrainers()
        {
            var trainers = await _context.Trainers
                .Include(t => t.TrainerSkills)
                .ThenInclude(ts => ts.Skill)
                .ToListAsync();

            var result = trainers.Select(t => new TrainerReadDto
            {
                TrainerId = t.TrainerId,
                TrainerName = t.TrainerName,
                DateOfBirth = t.DateOfBirth,
                MobileNo = t.MobileNo,
                Picture = t.Picture,
                Email = t.Email,
                IsExperienced = t.IsExperienced,
                TrainerSkills = t.TrainerSkills.Select(ts => new TrainerSkillReadDto
                {
                    SkillId = ts.SkillId,
                    SkillName = ts.Skill?.SkillName,
                    Experience = ts.Experience
                }).ToList()
            }).ToList();

            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TrainerReadDto>> GetTrainer(int id)
        {
            var trainer = await _context.Trainers
                .Include(t => t.TrainerSkills)
                .ThenInclude(ts => ts.Skill)
                .FirstOrDefaultAsync(t => t.TrainerId == id);

            if (trainer == null)
                return NotFound();

            var result = new TrainerReadDto
            {
                TrainerId = trainer.TrainerId,
                TrainerName = trainer.TrainerName,
                DateOfBirth = trainer.DateOfBirth,
                MobileNo = trainer.MobileNo,
                Picture = trainer.Picture,
                Email = trainer.Email,
                IsExperienced = trainer.IsExperienced,
                TrainerSkills = trainer.TrainerSkills.Select(ts => new TrainerSkillReadDto
                {
                    SkillId = ts.SkillId,
                    SkillName = ts.Skill?.SkillName,
                    Experience = ts.Experience
                }).ToList()
            };

            return result;
        }
        [HttpPost]
        public async Task<ActionResult<TrainerReadDto>> CreateTrainer([FromForm] TrainerCreateUpdateDto dto)
        {
            string uniqueFileName = "noimage.png";
            if (dto.PictureFile != null)
            {
                uniqueFileName = await SavePictureFile(dto.PictureFile);
            }

            var trainer = new Trainer
            {
                TrainerName = dto.TrainerName,
                DateOfBirth = dto.DateOfBirth,
                MobileNo = dto.MobileNo,
                Email=dto.Email,
                IsExperienced = dto.IsExperienced,
                Picture = uniqueFileName,
                TrainerSkills = new List<TrainerSkill>()
            };

            if (!string.IsNullOrEmpty(dto.TrainerSkillsJson))
            {
                var skillDtos = JsonConvert.DeserializeObject<List<TrainerSkillDto>>(dto.TrainerSkillsJson);
                foreach (var skillDto in skillDtos)
                {
                    trainer.TrainerSkills.Add(new TrainerSkill
                    {
                        SkillId = skillDto.SkillId,
                        Experience = skillDto.Experience
                    });
                }
            }

            _context.Trainers.Add(trainer);
            await _context.SaveChangesAsync();

            var savedTrainer = await _context.Trainers
                .Include(t => t.TrainerSkills)
                .ThenInclude(ts => ts.Skill)
                .FirstOrDefaultAsync(t => t.TrainerId == trainer.TrainerId);

            var result = new TrainerReadDto
            {
                TrainerId = savedTrainer.TrainerId,
                TrainerName = savedTrainer.TrainerName,
                DateOfBirth = savedTrainer.DateOfBirth,
                MobileNo = savedTrainer.MobileNo,
                Picture = savedTrainer.Picture,
                Email = savedTrainer.Email,
                IsExperienced = savedTrainer.IsExperienced,
                TrainerSkills = savedTrainer.TrainerSkills.Select(ts => new TrainerSkillReadDto
                {
                    SkillId = ts.SkillId,
                    SkillName = ts.Skill?.SkillName,
                    Experience = ts.Experience
                }).ToList()
            };

            return CreatedAtAction(nameof(GetTrainer), new { id = result.TrainerId }, result);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrainer(int id, [FromForm] TrainerCreateUpdateDto dto)
        {
            if (id != dto.TrainerId && dto.TrainerId != 0)
                return BadRequest("ID mismatch or invalid.");

            var trainer = await _context.Trainers
                .Include(t => t.TrainerSkills)
                .FirstOrDefaultAsync(t => t.TrainerId == id);

            if (trainer == null)
                return NotFound();

            if (dto.PictureFile != null)
            {
                if (trainer.Picture != "noimage.png")
                {
                    DeletePictureFile(trainer.Picture);
                }
                trainer.Picture = await SavePictureFile(dto.PictureFile);
            }
            else if (!string.IsNullOrEmpty(dto.Picture))
            {
                trainer.Picture = dto.Picture;
            }

            trainer.TrainerName = dto.TrainerName;
            trainer.DateOfBirth = dto.DateOfBirth;
            trainer.MobileNo = dto.MobileNo;
            trainer.Email = dto.Email;
            trainer.IsExperienced = dto.IsExperienced;
            trainer.TrainerSkills.Clear();

            if (!string.IsNullOrEmpty(dto.TrainerSkillsJson))
            {
                var skillDtos = JsonConvert.DeserializeObject<List<TrainerSkillDto>>(dto.TrainerSkillsJson);
                foreach (var skillDto in skillDtos)
                {
                    trainer.TrainerSkills.Add(new TrainerSkill
                    {
                        SkillId = skillDto.SkillId,
                        Experience = skillDto.Experience
                    });
                }
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainer(int id)
        {
            var trainer = await _context.Trainers
                .Include(t => t.TrainerSkills)
                .FirstOrDefaultAsync(t => t.TrainerId == id);

            if (trainer == null)
                return NotFound();

            if (trainer.Picture != "noimage.png")
            {
                DeletePictureFile(trainer.Picture);
            }

            _context.Trainers.Remove(trainer);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private async Task<string> SavePictureFile(IFormFile file)
        {
            var uploadsFolder = Path.Combine(_env.WebRootPath, "images");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return uniqueFileName;
        }
        private void DeletePictureFile(string fileName)
        {
            var filePath = Path.Combine(_env.WebRootPath, "images", fileName);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }
    }
}
