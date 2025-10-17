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
    public class ManagersController : ControllerBase
    {
        private readonly AppDbContext db;
        private readonly IWebHostEnvironment web;

        public ManagersController(AppDbContext db, IWebHostEnvironment web)
        {
            this.db = db;
            this.web = web;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ManagerReadDto>>> GetManagers()
        {
            var managers = await db.Managers
                .Include(m => m.ManagerTrainerAssignments)
                    .ThenInclude(t => t.Trainer).ToListAsync();
            var managerReadDtos = managers.Select(c => new ManagerReadDto
            {
                ManagerId = c.ManagerId,
                Name = c.Name,
                Dob = c.Dob,
                ImageUrl = c.ImageUrl,
                ContactNumber = c.ContactNumber,
                Email = c.Email,
                IsActive = c.IsActive,
                ManagerTrainerAssignments = c.ManagerTrainerAssignments.Select(cs => new ManagerTrainerAssignmentReadDto
                {
                    TrainerId = cs.TrainerId,
                    TrainerName = cs.Trainer?.TrainerName,
                    JoiningDate = cs.JoiningDate
                }).ToList()
            }).ToList();
            return Ok(managerReadDtos);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ManagerReadDto>> GetManager(int id)
        {
            var manager = await db.Managers
                .Include(c => c.ManagerTrainerAssignments)
                    .ThenInclude(cs => cs.Trainer)
                .FirstOrDefaultAsync(c => c.ManagerId == id);
            if (manager == null) { return NotFound(); }
            var managerReadDto = new ManagerReadDto
            {
                ManagerId = manager.ManagerId,
                Name = manager.Name,
                Dob = manager.Dob,
                ImageUrl = manager.ImageUrl,
                ContactNumber = manager.ContactNumber,
                Email = manager.Email,
                IsActive = manager.IsActive,
                ManagerTrainerAssignments = manager.ManagerTrainerAssignments.Select(cs => new ManagerTrainerAssignmentReadDto
                {
                    TrainerId = cs.TrainerId,
                    TrainerName = cs.Trainer?.TrainerName,               
                    JoiningDate = cs.JoiningDate
                }).ToList()
            };
            return managerReadDto;
        }

        [HttpPost]
        public async Task<ActionResult<ManagerReadDto>> CreateManager([FromForm] ManagerCreateUpdateDto managerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            string uniqueFileName = "noimage.png";
            if (managerDto.PictureFile != null)
            {
                uniqueFileName = await SavePictureFile(managerDto.PictureFile);
            }
            var manager = new Manager
            {
                Name = managerDto.Name,
                Dob = managerDto.Dob,
                ImageUrl = uniqueFileName,
                ContactNumber = managerDto.ContactNumber,
                Email = managerDto.Email,
                IsActive = managerDto.IsActive,
                ManagerTrainerAssignments = new List<ManagerTrainerAssignment>()
            };
            if (!string.IsNullOrEmpty(managerDto.ManagerTrainerAssignmentsJson))
            {
                var managerTrainerAssignmentDtos = JsonConvert.DeserializeObject<List<ManagerTrainerAssignmentDto>>(managerDto.ManagerTrainerAssignmentsJson);
                foreach (var trainerDto in managerTrainerAssignmentDtos)
                {
                    manager.ManagerTrainerAssignments.Add(new ManagerTrainerAssignment
                    {
                        TrainerId = trainerDto.TrainerId,
                        JoiningDate = trainerDto.JoiningDate
                    });
                }
            }
            db.Managers.Add(manager);
            await db.SaveChangesAsync();
            var savedManager = await db.Managers
                .Include(c => c.ManagerTrainerAssignments)
                .ThenInclude(cs => cs.Trainer)
                .FirstOrDefaultAsync(c => c.ManagerId == manager.ManagerId);
            var createdManagerReadDto = new ManagerReadDto
            {
                ManagerId = savedManager.ManagerId,
                Name = savedManager.Name,
                Dob = savedManager.Dob,
                ImageUrl = savedManager.ImageUrl,
                ContactNumber = savedManager.ContactNumber,
                Email = savedManager.Email,
                IsActive = savedManager.IsActive,
                ManagerTrainerAssignments = savedManager.ManagerTrainerAssignments.Select(cs => new ManagerTrainerAssignmentReadDto
                {
                    TrainerId = cs.TrainerId,
                    TrainerName = cs.Trainer?.TrainerName,
                    JoiningDate = cs.JoiningDate
                }).ToList()
            };

            return CreatedAtAction(nameof(GetManager), new { id = createdManagerReadDto.ManagerId }, createdManagerReadDto);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateManager(int id, [FromForm] ManagerCreateUpdateDto managerDto)
        {
            if (id != managerDto.ManagerId && managerDto.ManagerId != 0)
            {
                return BadRequest("Manager ID mismatch or invalid ID in form data.");
            }
            var existingManager = await db.Managers
                .Include(c => c.ManagerTrainerAssignments)
                .FirstOrDefaultAsync(c => c.ManagerId == id);
            if (existingManager == null) { return NotFound(); }
            if (managerDto.PictureFile != null)
            {
                if (existingManager.ImageUrl != "noimage.png")
                {
                    DeletePictureFile(existingManager.ImageUrl);
                }
                existingManager.ImageUrl = await SavePictureFile(managerDto.PictureFile);
            }
            else if (!string.IsNullOrEmpty(managerDto.ImageUrl))
            {
                existingManager.ImageUrl = managerDto.ImageUrl;
            }
            existingManager.Name = managerDto.Name;
            existingManager.Dob = managerDto.Dob;
            existingManager.ContactNumber = managerDto.ContactNumber;
            existingManager.Email = managerDto.Email;
            existingManager.IsActive = managerDto.IsActive;
            existingManager.ManagerTrainerAssignments.Clear();
            if (!string.IsNullOrEmpty(managerDto.ManagerTrainerAssignmentsJson))
            {
                var managerTrainerAssignmentDtos = JsonConvert.DeserializeObject<List<ManagerTrainerAssignmentDto>>(managerDto.ManagerTrainerAssignmentsJson);
                foreach (var trainerDto in managerTrainerAssignmentDtos)
                {
                    existingManager.ManagerTrainerAssignments.Add(new ManagerTrainerAssignment
                    {
                        ManagerId = existingManager.ManagerId,
                        TrainerId = trainerDto.TrainerId,
                        JoiningDate = trainerDto.JoiningDate
                    });
                }
            }
            try { await db.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!ManagerExists(id)) { return NotFound(); }
                else { throw; }
            }
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteManager(int id)
        {
            var manager = await db.Managers
                .Include(c => c.ManagerTrainerAssignments)
                .FirstOrDefaultAsync(c => c.ManagerId == id);
            if (manager == null)
            {
                return NotFound();
            }
            if (manager.ImageUrl != "noimage.png")
            {
                DeletePictureFile(manager.ImageUrl);
            }
            db.Managers.Remove(manager);
            await db.SaveChangesAsync();
            return NoContent();
        }
        private bool ManagerExists(int id)
        {
            return db.Managers.Any(e => e.ManagerId == id);
        }
        private async Task<string> SavePictureFile(IFormFile file)
        {
            var uploadsFolder = Path.Combine(web.WebRootPath, "images");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }
            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return uniqueFileName;
        }
        private void DeletePictureFile(string? fileName)
        {
            var filePath = Path.Combine(web.WebRootPath, "images", fileName);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }
    }
}
