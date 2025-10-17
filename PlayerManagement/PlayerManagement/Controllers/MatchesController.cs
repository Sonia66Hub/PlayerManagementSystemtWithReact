using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayerManagement.Data;
using PlayerManagement.DTOs;
using PlayerManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlayerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly AppDbContext db;

        public MatchesController(AppDbContext _db)
        {
            db = _db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MatchReadDTO>>> GetMatches()
        {
            var matches = await db.Matches
                .Include(m => m.MatchFormat)
                .Select(m => new MatchReadDTO
                {
                    MatchId = m.MatchId,
                    Title = m.Title,
                    MatchDate = m.MatchDate,
                    Venue = m.Venue,
                    TeamA = m.TeamA,
                    TeamB = m.TeamB,
                    Result = m.Result,
                    MatchFormat = new MatchFormatMini
                    {
                        MatchFormatId = m.MatchFormat.MatchFormatId,
                        FormatName = m.MatchFormat.FormatName
                    }
                    
                }) .ToListAsync();
            return Ok(matches);
        }

   
        [HttpGet("{id}")]
        public async Task<ActionResult<MatchReadDTO>> GetMatch(int id)
        {
            var match = await db.Matches
                .Include(m => m.MatchFormat)
                .FirstOrDefaultAsync(m => m.MatchId == id);

            if (match == null) return NotFound();

            return Ok(new MatchReadDTO
            {
                MatchId = match.MatchId,
                Title = match.Title,
                MatchDate = match.MatchDate,
                Venue = match.Venue,
                TeamA = match.TeamA,
                TeamB = match.TeamB,
                Result = match.Result,
                MatchFormat = new MatchFormatMini
                {
                    MatchFormatId = match.MatchFormat.MatchFormatId,
                    FormatName = match.MatchFormat.FormatName
                }              
            });
        }
        
        [HttpPut("{id}")]      
        public async Task<IActionResult> UpdateMatch(int id, [FromForm] MatchCreateUpdateDTO matchDto)
        {
            if (id != matchDto.MatchId && matchDto.MatchId != 0)
            {
                return BadRequest("Match ID mismatch.");
            }

            var existingMatch = await db.Matches.FindAsync(id);
            if (existingMatch == null) return NotFound();

            existingMatch.Title = matchDto.Title;
            existingMatch.MatchDate = matchDto.MatchDate;
            existingMatch.Venue = matchDto.Venue;
            existingMatch.TeamA = matchDto.TeamA;
            existingMatch.TeamB = matchDto.TeamB;
            existingMatch.Result = matchDto.Result;
            existingMatch.MatchFormatId = matchDto.MatchFormatId;

            await db.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateMatch([FromForm] MatchCreateUpdateDTO dto)
        {
            var match = new Match
            {
                Title = dto.Title,
                MatchDate = dto.MatchDate,
                Venue = dto.Venue,
                TeamA = dto.TeamA,
                TeamB = dto.TeamB,
                Result = dto.Result,
                MatchFormatId = dto.MatchFormatId
            };
            db.Matches.Add(match);
            await db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMatch), new { id = match.MatchId }, match);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMatch(int id)
        {
            var match = await db.Matches.FindAsync(id);
            if (match == null) return NotFound();

            db.Matches.Remove(match);
            await db.SaveChangesAsync();
            return NoContent();
        }

    }
}
