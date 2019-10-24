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
    public class BrakisController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public BrakisController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/Brakis
        [HttpGet]
        public IEnumerable<Braki> GetBraki()
        {
            return _context.Braki;
        }

        // GET: api/Brakis/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBraki([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var braki = await _context.Braki.FindAsync(id);

            if (braki == null)
            {
                return NotFound();
            }

            return Ok(braki);
        }

        // PUT: api/Brakis/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBraki([FromRoute] int id, [FromBody] Braki braki)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != braki.IdBraki)
            {
                return BadRequest();
            }

            _context.Entry(braki).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrakiExists(id))
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

        // POST: api/Brakis
        [HttpPost]
        public async Task<IActionResult> PostBraki([FromBody] Braki braki)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Braki.Add(braki);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBraki", new { id = braki.IdBraki }, braki);
        }

        // DELETE: api/Brakis/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBraki([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var braki = await _context.Braki.FindAsync(id);
            if (braki == null)
            {
                return NotFound();
            }

            _context.Braki.Remove(braki);
            await _context.SaveChangesAsync();

            return Ok(braki);
        }

        private bool BrakiExists(int id)
        {
            return _context.Braki.Any(e => e.IdBraki == id);
        }
    }
}