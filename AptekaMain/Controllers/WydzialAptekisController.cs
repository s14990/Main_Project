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
    public class WydzialAptekisController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public WydzialAptekisController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/WydzialAptekis
        [HttpGet]
        public IEnumerable<WydzialApteki> GetWydzialApteki()
        {
            return _context.WydzialApteki;
        }

        // GET: api/WydzialAptekis/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWydzialApteki([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var wydzialApteki = await _context.WydzialApteki.FindAsync(id);

            if (wydzialApteki == null)
            {
                return NotFound();
            }

            return Ok(wydzialApteki);
        }

        // PUT: api/WydzialAptekis/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWydzialApteki([FromRoute] int id, [FromBody] WydzialApteki wydzialApteki)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != wydzialApteki.IdWydzial)
            {
                return BadRequest();
            }

            _context.Entry(wydzialApteki).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WydzialAptekiExists(id))
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

        // POST: api/WydzialAptekis
        [HttpPost]
        public async Task<IActionResult> PostWydzialApteki([FromBody] WydzialApteki wydzialApteki)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.WydzialApteki.Add(wydzialApteki);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWydzialApteki", new { id = wydzialApteki.IdWydzial }, wydzialApteki);
        }

        // DELETE: api/WydzialAptekis/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWydzialApteki([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var wydzialApteki = await _context.WydzialApteki.FindAsync(id);
            if (wydzialApteki == null)
            {
                return NotFound();
            }

            _context.WydzialApteki.Remove(wydzialApteki);
            await _context.SaveChangesAsync();

            return Ok(wydzialApteki);
        }

        private bool WydzialAptekiExists(int id)
        {
            return _context.WydzialApteki.Any(e => e.IdWydzial == id);
        }
    }
}