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
    public class WydzialsController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public WydzialsController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/Wydzials
        [HttpGet]
        public IEnumerable<Wydzial> GetWydzial()
        {
            return _context.Wydzial;
        }

        // GET: api/Wydzials/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWydzial([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var wydzial = await _context.Wydzial.FindAsync(id);

            if (wydzial == null)
            {
                return NotFound();
            }

            return Ok(wydzial);
        }

        // PUT: api/Wydzials/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWydzial([FromRoute] int id, [FromBody] Wydzial wydzial)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != wydzial.IdWydzial)
            {
                return BadRequest();
            }

            _context.Entry(wydzial).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WydzialExists(id))
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

        // POST: api/Wydzials
        [HttpPost]
        public async Task<IActionResult> PostWydzial([FromBody] Wydzial wydzial)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Wydzial.Add(wydzial);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWydzial", new { id = wydzial.IdWydzial }, wydzial);
        }

        // DELETE: api/Wydzials/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWydzial([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var wydzial = await _context.Wydzial.FindAsync(id);
            if (wydzial == null)
            {
                return NotFound();
            }

            _context.Wydzial.Remove(wydzial);
            await _context.SaveChangesAsync();

            return Ok(wydzial);
        }

        private bool WydzialExists(int id)
        {
            return _context.Wydzial.Any(e => e.IdWydzial == id);
        }
    }
}