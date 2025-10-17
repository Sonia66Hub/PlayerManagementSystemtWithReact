using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PlayerManagement.Data;
using PlayerManagement.DTOs;
using PlayerManagement.Models;
using System.Numerics;

namespace PlayerManagement.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PlayerEvaluationsController : ControllerBase
    {
        private readonly AppDbContext db;

        public PlayerEvaluationsController(AppDbContext _db)
        {
            db = _db;
        }

        // Get all evaluations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlayerEvaluationReadDto>>> GetAllEvaluations()
        {
            var evaluations = await db.PlayerEvaluations.Where(p => !p.IsDeleted).Include(ed => ed.PlayerEvaluationDetails).ThenInclude(et => et.EvaluationType).Include(ed => ed.PlayerEvaluationDetails).ThenInclude(m=>m.Match).Include(ed => ed.PlayerEvaluationDetails).ThenInclude(c => c.EvaluationCategory).Include(p => p.Player).Include(t => t.Trainer).ToListAsync();
            var playerEvalReaddtos = evaluations.Select(p => new PlayerEvaluationReadDto
            {
                PlayerEvaluationId = p.PlayerEvaluationId,
                Player=new PlayerMini {
                    PlayerId = p.Player.PlayerId,
                    FullName= $"{p.Player.FirstName} {p.Player.LastName}"
                },
                Trainer = new TrainerMini
                {
                    TrainerId = p.Trainer.TrainerId,
                    TrainerName = p.Trainer.TrainerName
                },
                EvaluationDate = p.EvaluationDate,
                IsCompleted = p.IsCompleted,
                Remarks = p.Remarks,                            
                PlayerEvaluationDetails = p.PlayerEvaluationDetails.Select(pt => new PlayerEvaluationDetailReadDto
                {
                           
                    EvaluationTypeId = pt.EvaluationTypeId,
                    TypeName=pt.EvaluationType?.TypeName,
                    MatchId = pt.MatchId,
                    Title=pt.Match?.Title,
                    EvaluationCategoryId=pt.EvaluationCategoryId,
                    CategoryName=pt.EvaluationCategory?.CategoryName,
                        
                    OverNumber = pt.OverNumber,
                    BallNumber = pt.BallNumber,

                    RunsScored = pt.RunsScored,
                    BallsFaced = pt.BallsFaced,
                    Boundaries = pt.Boundaries,
                    IsOut = pt.IsOut,
                    DismissalType = pt.DismissalType,

                    BallsBowled = pt.BallsBowled,
                    RunsConceded = pt.RunsConceded,
                    WicketsTaken = pt.WicketsTaken,
                    NoBalls = pt.NoBalls,
                    Wides = pt.Wides,
                    IsBoundary = pt.IsBoundary,

                    CatchesTaken = pt.CatchesTaken,
                    RunOuts = pt.RunOuts,
                    Misfields = pt.Misfields,
                    Stumpings = pt.Stumpings
                    }).ToList()
            }).ToList();
            return Ok(playerEvalReaddtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PlayerEvaluationReadDto>> GetEvaluationById(int id)
        {
            var evaluation = await db.PlayerEvaluations.Where(p => !p.IsDeleted).Include(ed => ed.PlayerEvaluationDetails).ThenInclude(et => et.EvaluationType).Include(ed => ed.PlayerEvaluationDetails).ThenInclude(m => m.Match).Include(ed => ed.PlayerEvaluationDetails).ThenInclude(c => c.EvaluationCategory).Include(p => p.Player).Include(t => t.Trainer).FirstOrDefaultAsync(p => p.PlayerEvaluationId == id);

            if (evaluation == null) { return NotFound(); }
            var playerEvalReaddto = new PlayerEvaluationReadDto
            {
                PlayerEvaluationId = evaluation.PlayerEvaluationId,
                Player = new PlayerMini
                {
                    PlayerId = evaluation.Player.PlayerId,
                    FullName = $"{evaluation.Player.FirstName} {evaluation.Player.LastName}"
                },
                Trainer = new TrainerMini
                {
                    TrainerId = evaluation.Trainer.TrainerId,
                    TrainerName = evaluation.Trainer.TrainerName
                },
                EvaluationDate = evaluation.EvaluationDate,
                IsCompleted = evaluation.IsCompleted,
                Remarks = evaluation.Remarks,
                PlayerEvaluationDetails = evaluation.PlayerEvaluationDetails.Select(pt => new PlayerEvaluationDetailReadDto
                {

                    EvaluationTypeId = pt.EvaluationTypeId,
                    TypeName = pt.EvaluationType?.TypeName,
                    MatchId = pt.MatchId,
                    Title = pt.Match?.Title,
                    EvaluationCategoryId = pt.EvaluationCategoryId,
                    CategoryName = pt.EvaluationCategory?.CategoryName,

                    OverNumber = pt.OverNumber,
                    BallNumber = pt.BallNumber,

                    RunsScored = pt.RunsScored,
                    BallsFaced = pt.BallsFaced,
                    Boundaries = pt.Boundaries,
                    IsOut = pt.IsOut,
                    DismissalType = pt.DismissalType,

                    BallsBowled = pt.BallsBowled,
                    RunsConceded = pt.RunsConceded,
                    WicketsTaken = pt.WicketsTaken,
                    NoBalls = pt.NoBalls,
                    Wides = pt.Wides,
                    IsBoundary = pt.IsBoundary,

                    CatchesTaken = pt.CatchesTaken,
                    RunOuts = pt.RunOuts,
                    Misfields = pt.Misfields,
                    Stumpings = pt.Stumpings
                }).ToList()
            };
            return playerEvalReaddto;
        }
        //Create evaluation
        [HttpPost]
        public async Task<ActionResult<PlayerEvaluationReadDto>> CreateEvaluation([FromForm] PlayerEvaluationCreateUpdateDto dto) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var evaluation = new PlayerEvaluation
            {

                PlayerId = dto.PlayerId,
                TrainerId = dto.TrainerId,
                EvaluationDate = dto.EvaluationDate,
                IsCompleted=dto.IsCompleted,
                Remarks=dto.Remarks,
                PlayerEvaluationDetails = new List<PlayerEvaluationDetail>()
            };

            if (!string.IsNullOrEmpty(dto.PlayerEvaluationDetailsJson))
            {
                var playerEvaluationDetailsDto = JsonConvert.DeserializeObject<List<PlayerEvaluationDetailDto>>(dto.PlayerEvaluationDetailsJson);

                foreach (var evaluationDetailDto in playerEvaluationDetailsDto)
                {
                    evaluation.PlayerEvaluationDetails.Add(new PlayerEvaluationDetail
                    {

                        EvaluationTypeId = evaluationDetailDto.EvaluationTypeId,
                        MatchId=evaluationDetailDto.MatchId,
                        EvaluationCategoryId = evaluationDetailDto.EvaluationCategoryId,

                        OverNumber = evaluationDetailDto.OverNumber,
                        BallNumber = evaluationDetailDto.BallNumber,

                        RunsScored = evaluationDetailDto.RunsScored,
                        BallsFaced = evaluationDetailDto.BallsFaced,
                        Boundaries = evaluationDetailDto.Boundaries,
                        IsOut = evaluationDetailDto.IsOut,
                        DismissalType = evaluationDetailDto.DismissalType,

                        BallsBowled = evaluationDetailDto.BallsBowled,
                        RunsConceded = evaluationDetailDto.RunsConceded,
                        WicketsTaken = evaluationDetailDto.WicketsTaken,
                        NoBalls = evaluationDetailDto.NoBalls,
                        Wides = evaluationDetailDto.Wides,
                        IsBoundary = evaluationDetailDto.IsBoundary,

                        CatchesTaken = evaluationDetailDto.CatchesTaken,
                        RunOuts = evaluationDetailDto.RunOuts,
                        Misfields = evaluationDetailDto.Misfields,
                        Stumpings = evaluationDetailDto.Stumpings
                    });
                 
                }
            }
            db.PlayerEvaluations.Add(evaluation);
            await db.SaveChangesAsync();
            var savedEvaluation = await db.PlayerEvaluations.Include(p => p.PlayerEvaluationDetails).ThenInclude(et=>et.EvaluationType).Include(p => p.PlayerEvaluationDetails).ThenInclude(m => m.Match).Include(p => p.PlayerEvaluationDetails).ThenInclude(m => m.EvaluationCategory).Include(p => p.Player).Include(t => t.Trainer).FirstOrDefaultAsync(p => p.PlayerEvaluationId == evaluation.PlayerEvaluationId);
            var createdPlayerEvaluationReadDto = new PlayerEvaluationReadDto
            {
                PlayerEvaluationId = savedEvaluation.PlayerEvaluationId,
                EvaluationDate = savedEvaluation.EvaluationDate,
                IsCompleted = savedEvaluation.IsCompleted,
                Remarks = savedEvaluation.Remarks,
                Player = savedEvaluation.Player != null ? new PlayerMini
                {
                    PlayerId = savedEvaluation.Player.PlayerId,
                    FullName = savedEvaluation.Player.FirstName+" "+savedEvaluation.Player.LastName
                } : null,
                Trainer = savedEvaluation.Trainer != null ? new TrainerMini
                {
                    TrainerId = savedEvaluation.Trainer.TrainerId,
                    TrainerName = savedEvaluation.Trainer.TrainerName
                } : null,

                PlayerEvaluationDetails = savedEvaluation.PlayerEvaluationDetails.Select(cs => new PlayerEvaluationDetailReadDto
                {

                    EvaluationTypeId=cs.EvaluationTypeId,   
                    TypeName=cs.EvaluationType?.TypeName,
                    MatchId = cs.MatchId,
                    Title=cs.Match?.Title,
                    EvaluationCategoryId=cs.EvaluationCategoryId,
                    CategoryName=cs.EvaluationCategory?.CategoryName,

                    OverNumber=cs.OverNumber,
                    BallNumber=cs.BallNumber,

                    RunsScored = cs.RunsScored,
                    BallsFaced = cs.BallsFaced,
                    Boundaries = cs.Boundaries,
                    IsOut = cs.IsOut,
                    DismissalType = cs.DismissalType,

                    BallsBowled = cs.BallsBowled,
                    RunsConceded = cs.RunsConceded,
                    WicketsTaken = cs.WicketsTaken,
                    NoBalls = cs.NoBalls,
                    Wides = cs.Wides,
                    IsBoundary = cs.IsBoundary,

                    CatchesTaken = cs.CatchesTaken,
                    RunOuts = cs.RunOuts,
                    Misfields = cs.Misfields,
                    Stumpings = cs.Stumpings

                }).ToList()
            };

            return CreatedAtAction(nameof(GetEvaluationById), new { id = createdPlayerEvaluationReadDto.PlayerEvaluationId }, createdPlayerEvaluationReadDto);
        }

        // Update evaluation
        [HttpPut("{id}")]
        public async Task<ActionResult<PlayerEvaluationReadDto>> UpdateEvaluation(int id, [FromForm] PlayerEvaluationCreateUpdateDto updateDto)
        {
            if (id != updateDto.PlayerEvaluationId && updateDto.PlayerEvaluationId != 0)
            {
                return BadRequest("Player Evaluation ID mismatch or invalid ID in form data.");
            }

            var existingEvaluation = await db.PlayerEvaluations
                .Include(p => p.PlayerEvaluationDetails)
                .FirstOrDefaultAsync(p => p.PlayerEvaluationId == id);

            if (existingEvaluation == null)
                return NotFound();

            // Update scalar properties
            existingEvaluation.EvaluationDate = updateDto.EvaluationDate;
            existingEvaluation.IsCompleted = updateDto.IsCompleted;
            existingEvaluation.Remarks = updateDto.Remarks;
            existingEvaluation.PlayerId = updateDto.PlayerId;
            existingEvaluation.TrainerId = updateDto.TrainerId;

            // Remove old training assignments
            db.PlayerEvaluationDetails.RemoveRange(existingEvaluation.PlayerEvaluationDetails);
            existingEvaluation.PlayerEvaluationDetails.Clear();

            // Add updated training assignments
            if (!string.IsNullOrEmpty(updateDto.PlayerEvaluationDetailsJson))
            {
                var evaluations = JsonConvert.DeserializeObject<List<PlayerEvaluationDetailDto>>(updateDto.PlayerEvaluationDetailsJson);
                foreach (var evaluationDto in evaluations)
                {

                    existingEvaluation.PlayerEvaluationDetails.Add(new PlayerEvaluationDetail
                    {
                        PlayerEvaluationId=existingEvaluation.PlayerEvaluationId,


                        EvaluationTypeId = evaluationDto.EvaluationTypeId,
                        MatchId = evaluationDto.MatchId,
                        EvaluationCategoryId=evaluationDto.EvaluationCategoryId,

                        OverNumber = evaluationDto.OverNumber,
                        BallNumber = evaluationDto.BallNumber,

                        RunsScored = evaluationDto.RunsScored,
                        BallsFaced = evaluationDto.BallsFaced,
                        Boundaries = evaluationDto.Boundaries,
                        IsOut = evaluationDto.IsOut,
                        DismissalType = evaluationDto.DismissalType,

                        BallsBowled = evaluationDto.BallsBowled,
                        RunsConceded = evaluationDto.RunsConceded,
                        WicketsTaken = evaluationDto.WicketsTaken,
                        NoBalls = evaluationDto.NoBalls,
                        Wides = evaluationDto.Wides,
                        IsBoundary = evaluationDto.IsBoundary,

                        CatchesTaken = evaluationDto.CatchesTaken,
                        RunOuts = evaluationDto.RunOuts,
                        Misfields = evaluationDto.Misfields,
                        Stumpings = evaluationDto.Stumpings
                    });
                }
            }

            try { await db.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayerEvaluationExists(id)) { return NotFound(); }
                else { throw; }
            }
            return NoContent();
        }
        private bool PlayerEvaluationExists(int id)
        {
            return db.PlayerEvaluations.Any(e => e.PlayerEvaluationId == id);
        }
        // Delete evaluation
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvaluation(int id)
        {
            var evaluation = await db.PlayerEvaluations
                .Include(e => e.PlayerEvaluationDetails)
                .FirstOrDefaultAsync(c => c.PlayerEvaluationId == id);
            if (evaluation == null)
            {
                return NotFound();
            }
            evaluation.IsDeleted = true;
            await db.SaveChangesAsync();
            return Ok(new { message = "Evaluation deleted successfully" });
        }

    }

}
