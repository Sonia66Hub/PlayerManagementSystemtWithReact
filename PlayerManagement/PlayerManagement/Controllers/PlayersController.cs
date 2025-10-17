using System.Numerics;
using Humanizer;
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
    public class PlayersController : ControllerBase
    {
        private readonly AppDbContext db;
        private readonly IWebHostEnvironment web;

        public PlayersController(AppDbContext db, IWebHostEnvironment web)
        {
            this.db = db;
            this.web = web;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlayerReadDto>>> GetAllPlayers()
        {
            var players = await db.Players.Where(p => !p.IsDeleted).Include(ta => ta.PlayerTrainingAssignments).ThenInclude(t => t.Training).Include(p => p.Religion).Include(p => p.BloodGroup).Include(p => p.SportsType).Include(p=>p.Gender).ToListAsync();
            var playerReaddtos = players.Select(p => new PlayerReadDto
            {
                PlayerId = p.PlayerId,
                FirstName = p.FirstName,
                LastName = p.LastName,
                DateOfBirth = p.DateOfBirth,
                FathersName = p.FathersName,
                MothersName = p.MothersName,
                MobileNo = p.MobileNo,
                ImageUrl = p.ImageUrl,
                ImageName = p.ImageName,
                Email = p.Email,
                Height = p.Height,
                PlayerWeight = p.PlayerWeight,
                NidNumber = p.NidNumber,
                LastEducationalQualification = p.LastEducationalQualification,
                Gender = new GenderMini
                {
                    GenderId = p.Gender.GenderId,
                    GenderName = p.Gender.GenderName,
                },
                Religion = new ReligionMini
                {
                    ReligionId = p.Religion.ReligionId,
                    ReligionName = p.Religion.ReligionName
                },
                BloodGroup = new BloodGroupMini
                {
                    BloodGroupId = p.BloodGroup.BloodGroupId,
                    GroupName = p.BloodGroup.GroupName
                },
                SportsType = new SportsTypeMini
                {
                    SportsTypeId = p.SportsType.SportsTypeId,
                    TypeName = p.SportsType.TypeName
                },
                PlayerTrainingAssignments = p.PlayerTrainingAssignments.Select(pt => new PlayerTrainingAssignmentReadDto
                {
                    TrainingId = pt.TrainingId,
                    TrainingName = pt.Training?.TrainingName,
                    TrainingDate = pt.TrainingDate,
                    Duration = pt.Duration,
                    Venue = pt.Venue
                }).ToList()
            }).ToList();

            return Ok(playerReaddtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PlayerReadDto>> GetPlayer(int id)
        {
            var player = await db.Players.Where(p => !p.IsDeleted).Include(ta => ta.PlayerTrainingAssignments).ThenInclude(t => t.Training).Include(p => p.Religion).Include(p => p.BloodGroup).Include(p => p.SportsType).Include(p => p.Gender).FirstOrDefaultAsync(p => p.PlayerId == id);

            if (player == null) { return NotFound(); }

            var playerReadDto = new PlayerReadDto
            {
                PlayerId = player.PlayerId,
                FirstName = player.FirstName,
                LastName = player.LastName,
                DateOfBirth = player.DateOfBirth,
                FathersName = player.FathersName,
                MothersName = player.MothersName,
                MobileNo = player.MobileNo,
                ImageUrl = player.ImageUrl,
                ImageName = player.ImageName,
                Email = player.Email,
                Height = player.Height,
                PlayerWeight = player.PlayerWeight,
                NidNumber = player.NidNumber,
                LastEducationalQualification = player.LastEducationalQualification,
                Gender = new GenderMini
                {
                    GenderId = player.Gender.GenderId,
                    GenderName = player.Gender.GenderName,
                },
                Religion = new ReligionMini
                {
                    ReligionId = player.Religion.ReligionId,
                    ReligionName = player.Religion.ReligionName
                },
                BloodGroup = new BloodGroupMini
                {
                    BloodGroupId = player.BloodGroup.BloodGroupId,
                    GroupName = player.BloodGroup.GroupName
                },
                SportsType = new SportsTypeMini
                {
                    SportsTypeId = player.SportsType.SportsTypeId,
                    TypeName = player.SportsType.TypeName
                },
                PlayerTrainingAssignments = player.PlayerTrainingAssignments.Select(pt => new PlayerTrainingAssignmentReadDto
                {
                    TrainingId = pt.TrainingId,
                    TrainingName = pt.Training?.TrainingName,
                    TrainingDate = pt.TrainingDate,
                    Duration = pt.Duration,
                    Venue = pt.Venue
                }).ToList()

            };
            return playerReadDto;
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(int id)
        {
            var player = await db.Players.Include(p => p.PlayerTrainingAssignments).FirstOrDefaultAsync(p => p.PlayerId == id);

            if (player == null)
                return NotFound(new { message = "Player not found" });

            player.IsDeleted = true;
            await db.SaveChangesAsync();

            return Ok(new { message = "Player deleted successfully" });
        }


        [HttpPost]
        public async Task<ActionResult<PlayerReadDto>> CreateCandidate([FromForm] PlayerCreateUpdateDto playerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string uniqueFileName = null;

            if (playerDto.PictureFile != null)
            {
                var uploadsFolder = Path.Combine(web.WebRootPath, "images", "players");
                Directory.CreateDirectory(uploadsFolder);

                uniqueFileName = $"{Guid.NewGuid()}_{playerDto.PictureFile.FileName}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await playerDto.PictureFile.CopyToAsync(stream);
                }
            }
            var player = new Player
            {
                FirstName = playerDto.FirstName,
                LastName = playerDto.LastName,
                FathersName = playerDto.FathersName,
                MothersName = playerDto.MothersName,
                Email = playerDto.Email,
                Height = playerDto.Height,
                PlayerWeight = playerDto.PlayerWeight,
                LastEducationalQualification = playerDto.LastEducationalQualification,
                NidNumber = playerDto.NidNumber,
                DateOfBirth = playerDto.DateOfBirth,
                MobileNo = playerDto.MobileNo,
                ImageName = uniqueFileName,
                ImageUrl = uniqueFileName != null ? $"/images/players/{uniqueFileName}" : null,
                BloodGroupId = playerDto.BloodGroupId,
                GenderId = playerDto.GenderId,
                ReligionId = playerDto.ReligionId,
                SportsTypeId = playerDto.SportsTypeId,
                PlayerTrainingAssignments = new List<PlayerTrainingAssignment>()
            };
            
            if (!string.IsNullOrEmpty(playerDto.PlayerTrainingAssignmentsJson))
            {
                var playerTrainingAssignmentDto = JsonConvert.DeserializeObject<List<PlayerTrainingAssignmentDto>>(playerDto.PlayerTrainingAssignmentsJson);

                foreach (var trainingDto in playerTrainingAssignmentDto)
                {
                    Training? training = null;

                    // Create new Training only if TrainingId is 0
                    if (trainingDto.TrainingId == 0)
                    {
                        training = new Training
                        {
                            TrainingName = trainingDto.TrainingName
                        };

                        db.Training.Add(training);
                        await db.SaveChangesAsync(); // To generate TrainingId
                    }
                    else
                    {
                        training = await db.Training.FindAsync(trainingDto.TrainingId);
                        if (training == null)
                        {
                            return BadRequest($"Training with ID {trainingDto.TrainingId} does not exist.");
                        }
                    }

                    // Now attach to Player
                    player.PlayerTrainingAssignments.Add(new PlayerTrainingAssignment
                    {
                        TrainingId = training.TrainingId,
                        TrainingDate = trainingDto.TrainingDate,
                        Duration = trainingDto.Duration,
                        Venue = trainingDto.Venue
                    });
                }
            }

            db.Players.Add(player);
            await db.SaveChangesAsync();
            var savedPlayer = await db.Players.Include(p => p.PlayerTrainingAssignments).ThenInclude(cs => cs.Training).Include(p => p.BloodGroup).Include(p => p.Religion).Include(p => p.SportsType).Include(p => p.Gender).FirstOrDefaultAsync(p => p.PlayerId == player.PlayerId);
            var createdPlayerReadDto = new PlayerReadDto
            {
                PlayerId = savedPlayer.PlayerId,
                FirstName = savedPlayer.FirstName,
                LastName = savedPlayer.LastName,
                DateOfBirth = savedPlayer.DateOfBirth,
                FathersName = savedPlayer.FathersName,
                MothersName = savedPlayer.MothersName,
                MobileNo = savedPlayer.MobileNo,
                ImageName = uniqueFileName,
                ImageUrl = uniqueFileName != null ? $"/images/players/{uniqueFileName}" : null,
                NidNumber = savedPlayer.NidNumber,
                Email = savedPlayer.Email,
                Height = savedPlayer.Height,
                PlayerWeight = savedPlayer.PlayerWeight,
                LastEducationalQualification = savedPlayer.LastEducationalQualification,

                BloodGroup = savedPlayer.BloodGroup != null ? new BloodGroupMini
                {
                    BloodGroupId = savedPlayer.BloodGroup.BloodGroupId,
                    GroupName = savedPlayer.BloodGroup.GroupName
                } : null,
                Gender = savedPlayer.Gender != null ? new GenderMini
                {
                    GenderId = savedPlayer.Gender.GenderId,
                    GenderName = savedPlayer.Gender.GenderName
                } : null,

                Religion = savedPlayer.Religion != null ? new ReligionMini
                {
                    ReligionId = savedPlayer.Religion.ReligionId,
                    ReligionName = savedPlayer.Religion.ReligionName
                } : null,

                SportsType = savedPlayer.SportsType != null ? new SportsTypeMini
                {
                    SportsTypeId = savedPlayer.SportsType.SportsTypeId,
                    TypeName = savedPlayer.SportsType.TypeName
                } : null,

                PlayerTrainingAssignments = savedPlayer.PlayerTrainingAssignments.Select(cs => new PlayerTrainingAssignmentReadDto
                {
                    TrainingId = cs.TrainingId,
                    TrainingName = cs.Training?.TrainingName,
                    TrainingDate = cs.TrainingDate,
                    Duration = cs.Duration,
                    Venue = cs.Venue
                }).ToList()
            };

            return CreatedAtAction(nameof(GetPlayer), new { id = createdPlayerReadDto.PlayerId }, createdPlayerReadDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<PlayerReadDto>> UpdatePlayer(int id, [FromForm] PlayerCreateUpdateDto playerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingPlayer = await db.Players
                .Include(p => p.PlayerTrainingAssignments)
                .FirstOrDefaultAsync(p => p.PlayerId == id);

            if (existingPlayer == null)
                return NotFound();

            // Handle optional image update
            if (playerDto.PictureFile != null)
            {
                var uploadsFolder = Path.Combine(web.WebRootPath, "images", "players");
                Directory.CreateDirectory(uploadsFolder);

                if (!string.IsNullOrEmpty(existingPlayer.ImageName))
                {
                    var oldFilePath = Path.Combine(uploadsFolder, existingPlayer.ImageName);
                    if (System.IO.File.Exists(oldFilePath))
                        System.IO.File.Delete(oldFilePath);
                }

                var uniqueFileName = $"{Guid.NewGuid()}_{playerDto.PictureFile.FileName}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await playerDto.PictureFile.CopyToAsync(stream);
                }

                existingPlayer.ImageName = uniqueFileName;
                existingPlayer.ImageUrl = $"/images/players/{uniqueFileName}";
            }

            // Update scalar properties
            existingPlayer.FirstName = playerDto.FirstName;
            existingPlayer.LastName = playerDto.LastName;
            existingPlayer.FathersName = playerDto.FathersName;
            existingPlayer.MothersName = playerDto.MothersName;
            existingPlayer.Email = playerDto.Email;
            existingPlayer.Height = playerDto.Height;
            existingPlayer.PlayerWeight = playerDto.PlayerWeight;
            existingPlayer.LastEducationalQualification = playerDto.LastEducationalQualification;
            existingPlayer.NidNumber = playerDto.NidNumber;
            existingPlayer.DateOfBirth = playerDto.DateOfBirth;
            existingPlayer.MobileNo = playerDto.MobileNo;
            existingPlayer.BloodGroupId = playerDto.BloodGroupId;
            existingPlayer.GenderId = playerDto.GenderId;
            existingPlayer.ReligionId = playerDto.ReligionId;
            existingPlayer.SportsTypeId = playerDto.SportsTypeId;

            // Remove old training assignments
            db.PlayerTrainingAssignments.RemoveRange(existingPlayer.PlayerTrainingAssignments);
            existingPlayer.PlayerTrainingAssignments.Clear();

            // Add updated training assignments
            if (!string.IsNullOrEmpty(playerDto.PlayerTrainingAssignmentsJson))
            {
                var assignments = JsonConvert.DeserializeObject<List<PlayerTrainingAssignmentDto>>(playerDto.PlayerTrainingAssignmentsJson);
                foreach (var trainingDto in assignments)
                {
                    Training? training = null;

                    if (trainingDto.TrainingId == 0)
                    {
                        training = new Training
                        {
                            TrainingName = trainingDto.TrainingName
                        };

                        db.Training.Add(training);
                        await db.SaveChangesAsync(); // generate TrainingId
                    }
                    else
                    {
                        training = await db.Training.FindAsync(trainingDto.TrainingId);
                        if (training == null)
                        {
                            return BadRequest($"Training with ID {trainingDto.TrainingId} does not exist.");
                        }
                    }

                    existingPlayer.PlayerTrainingAssignments.Add(new PlayerTrainingAssignment
                    {
                        TrainingId = training.TrainingId,
                        TrainingDate = trainingDto.TrainingDate,
                        Duration = trainingDto.Duration,
                        Venue = trainingDto.Venue
                    });
                }
            }

            await db.SaveChangesAsync();

            var updatedPlayer = await db.Players
                .Include(p => p.PlayerTrainingAssignments).ThenInclude(t => t.Training)
                .Include(p => p.BloodGroup)
                .Include(p => p.Religion)
                .Include(p => p.SportsType)
                .Include(p => p.Gender)
                .FirstOrDefaultAsync(p => p.PlayerId == id);

            var updatedDto = new PlayerReadDto
            {
                PlayerId = updatedPlayer.PlayerId,
                FirstName = updatedPlayer.FirstName,
                LastName = updatedPlayer.LastName,
                DateOfBirth = updatedPlayer.DateOfBirth,
                FathersName = updatedPlayer.FathersName,
                MothersName = updatedPlayer.MothersName,
                MobileNo = updatedPlayer.MobileNo,
                ImageName = updatedPlayer.ImageName,
                ImageUrl = updatedPlayer.ImageUrl,
                NidNumber = updatedPlayer.NidNumber,
                Email = updatedPlayer.Email,
                Height = updatedPlayer.Height,
                PlayerWeight = updatedPlayer.PlayerWeight,
                LastEducationalQualification = updatedPlayer.LastEducationalQualification,

                BloodGroup = updatedPlayer.BloodGroup != null ? new BloodGroupMini
                {
                    BloodGroupId = updatedPlayer.BloodGroup.BloodGroupId,
                    GroupName = updatedPlayer.BloodGroup.GroupName
                } : null,
                Gender = updatedPlayer.Gender != null ? new GenderMini
                {
                    GenderId = updatedPlayer.Gender.GenderId,
                    GenderName = updatedPlayer.Gender.GenderName
                } : null,

                Religion = updatedPlayer.Religion != null ? new ReligionMini
                {
                    ReligionId = updatedPlayer.Religion.ReligionId,
                    ReligionName = updatedPlayer.Religion.ReligionName
                } : null,

                SportsType = updatedPlayer.SportsType != null ? new SportsTypeMini
                {
                    SportsTypeId = updatedPlayer.SportsType.SportsTypeId,
                    TypeName = updatedPlayer.SportsType.TypeName
                } : null,

                PlayerTrainingAssignments = updatedPlayer.PlayerTrainingAssignments.Select(cs => new PlayerTrainingAssignmentReadDto
                {
                    TrainingId = cs.TrainingId,
                    TrainingName = cs.Training?.TrainingName,
                    TrainingDate = cs.TrainingDate,
                    Duration = cs.Duration,
                    Venue = cs.Venue
                }).ToList()
            };

            return Ok(updatedDto);
        }

    }
}
