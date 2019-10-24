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
    public class PartiasController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public PartiasController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/Partias
        [HttpGet]
        public IEnumerable<Partia> GetPartia()
        {
            return _context.Partia;
        }

        // GET: api/Partias/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPartia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var partia = await _context.Partia.FindAsync(id);

            if (partia == null)
            {
                return NotFound();
            }

            return Ok(partia);
        }

        // PUT: api/Partias/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartia([FromRoute] int id, [FromBody] Partia partia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != partia.IdPartia)
            {
                return BadRequest();
            }

            _context.Entry(partia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartiaExists(id))
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

        // POST: api/Partias
        [HttpPost]
        public async Task<IActionResult> PostPartia([FromBody] Partia partia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Partia.Add(partia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPartia", new { id = partia.IdPartia }, partia);
        }

        // DELETE: api/Partias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePartia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var partia = await _context.Partia.FindAsync(id);
            if (partia == null)
            {
                return NotFound();
            }

            _context.Partia.Remove(partia);
            await _context.SaveChangesAsync();

            return Ok(partia);
        }

        private bool PartiaExists(int id)
        {
            return _context.Partia.Any(e => e.IdPartia == id);
        }
    }
}