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
    public class ProducentsController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public ProducentsController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/Producents
        [HttpGet]
        public IEnumerable<Producent> GetProducent()
        {
            return _context.Producent;
        }

        // GET: api/Producents/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProducent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var producent = await _context.Producent.FindAsync(id);

            if (producent == null)
            {
                return NotFound();
            }

            return Ok(producent);
        }

        // PUT: api/Producents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducent([FromRoute] int id, [FromBody] Producent producent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != producent.IdProducent)
            {
                return BadRequest();
            }

            _context.Entry(producent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProducentExists(id))
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

        // POST: api/Producents
        [HttpPost]
        public async Task<IActionResult> PostProducent([FromBody] Producent producent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Producent.Add(producent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducent", new { id = producent.IdProducent }, producent);
        }

        // DELETE: api/Producents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var producent = await _context.Producent.FindAsync(id);
            if (producent == null)
            {
                return NotFound();
            }

            _context.Producent.Remove(producent);
            await _context.SaveChangesAsync();

            return Ok(producent);
        }

        private bool ProducentExists(int id)
        {
            return _context.Producent.Any(e => e.IdProducent == id);
        }
    }
}