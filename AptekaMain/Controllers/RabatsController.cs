using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AptekaMain.Models;

namespace AptekaMain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RabatsController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public RabatsController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/Rabats
        [HttpGet]
        public IEnumerable<Rabat> GetRabat()
        {
            return _context.Rabat;
        }

        // GET: api/Rabats/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRabat([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rabat = await _context.Rabat.FindAsync(id);

            if (rabat == null)
            {
                return NotFound();
            }

            return Ok(rabat);
        }

        // PUT: api/Rabats/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRabat([FromRoute] int id, [FromBody] Rabat rabat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rabat.IdRabat)
            {
                return BadRequest();
            }

            _context.Entry(rabat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RabatExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Rabats
        [HttpPost]
        public async Task<IActionResult> PostRabat([FromBody] Rabat rabat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Rabat.Add(rabat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRabat", new { id = rabat.IdRabat }, rabat);
        }

        // DELETE: api/Rabats/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRabat([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rabat = await _context.Rabat.FindAsync(id);
            if (rabat == null)
            {
                return NotFound();
            }

            _context.Rabat.Remove(rabat);
            await _context.SaveChangesAsync();

            return Ok(rabat);
        }

        private bool RabatExists(int id)
        {
            return _context.Rabat.Any(e => e.IdRabat == id);
        }
    }
}