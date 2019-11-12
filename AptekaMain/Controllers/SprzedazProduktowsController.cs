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
    public class SprzedazProduktowsController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public SprzedazProduktowsController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/SprzedazProduktows
        [HttpGet]
        public IEnumerable<SprzedazProduktow> GetSprzedazProduktow()
        {
            return _context.SprzedazProduktow;
        }

        // GET: api/SprzedazProduktows/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSprzedazProduktow([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sprzedazProduktow = await _context.SprzedazProduktow.FindAsync(id);

            if (sprzedazProduktow == null)
            {
                return NotFound();
            }

            return Ok(sprzedazProduktow);
        }

        // PUT: api/SprzedazProduktows/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSprzedazProduktow([FromRoute] int id, [FromBody] SprzedazProduktow sprzedazProduktow)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sprzedazProduktow.SprzedazIdSprzedazy)
            {
                return BadRequest();
            }

            _context.Entry(sprzedazProduktow).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SprzedazProduktowExists(id))
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

        // POST: api/SprzedazProduktows
        [HttpPost]
        public async Task<IActionResult> PostSprzedazProduktow([FromBody] SprzedazProduktow sprzedazProduktow)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.SprzedazProduktow.Add(sprzedazProduktow);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSprzedazProduktow", new { id = sprzedazProduktow.SprzedazIdSprzedazy }, sprzedazProduktow);
        }

        // DELETE: api/SprzedazProduktows/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSprzedazProduktow([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sprzedazProduktow = await _context.SprzedazProduktow.FindAsync(id);
            if (sprzedazProduktow == null)
            {
                return NotFound();
            }

            _context.SprzedazProduktow.Remove(sprzedazProduktow);
            await _context.SaveChangesAsync();

            return Ok(sprzedazProduktow);
        }

        private bool SprzedazProduktowExists(int id)
        {
            return _context.SprzedazProduktow.Any(e => e.SprzedazIdSprzedazy == id);
        }
    }
}