using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AptekaMain.Models;
using Microsoft.AspNet.OData;

namespace AptekaMain.Controllers
{
    [EnableQuery]

    [Route("api/[controller]")]
    [ApiController]
    public class SprzedazProduktówController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public SprzedazProduktówController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/SprzedazProduktów
        [HttpGet]
        public IEnumerable<SprzedazProduktów> GetSprzedazProduktów()
        {
            return _context.SprzedazProduktów;
        }

        // GET: api/SprzedazProduktów/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSprzedazProduktów([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sprzedazProduktów = await _context.SprzedazProduktów.FindAsync(id);

            if (sprzedazProduktów == null)
            {
                return NotFound();
            }

            return Ok(sprzedazProduktów);
        }

        // PUT: api/SprzedazProduktów/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSprzedazProduktów([FromRoute] int id, [FromBody] SprzedazProduktów sprzedazProduktów)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sprzedazProduktów.SprzedazIdSprzedazy)
            {
                return BadRequest();
            }

            _context.Entry(sprzedazProduktów).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SprzedazProduktówExists(id))
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

        // POST: api/SprzedazProduktów
        [HttpPost]
        public async Task<IActionResult> PostSprzedazProduktów([FromBody] SprzedazProduktów sprzedazProduktów)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.SprzedazProduktów.Add(sprzedazProduktów);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSprzedazProduktów", new { id = sprzedazProduktów.SprzedazIdSprzedazy }, sprzedazProduktów);
        }

        // DELETE: api/SprzedazProduktów/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSprzedazProduktów([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sprzedazProduktów = await _context.SprzedazProduktów.FindAsync(id);
            if (sprzedazProduktów == null)
            {
                return NotFound();
            }

            _context.SprzedazProduktów.Remove(sprzedazProduktów);
            await _context.SaveChangesAsync();

            return Ok(sprzedazProduktów);
        }

        private bool SprzedazProduktówExists(int id)
        {
            return _context.SprzedazProduktów.Any(e => e.SprzedazIdSprzedazy == id);
        }
    }
}