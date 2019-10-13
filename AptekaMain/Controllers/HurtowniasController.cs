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
    public class HurtowniasController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public HurtowniasController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/Hurtownias
        [HttpGet]
        public IEnumerable<Hurtownia> GetHurtownia()
        {
            return _context.Hurtownia;
        }

        // GET: api/Hurtownias/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHurtownia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var hurtownia = await _context.Hurtownia.FindAsync(id);

            if (hurtownia == null)
            {
                return NotFound();
            }

            return Ok(hurtownia);
        }

        // PUT: api/Hurtownias/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHurtownia([FromRoute] int id, [FromBody] Hurtownia hurtownia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hurtownia.IdHurtownia)
            {
                return BadRequest();
            }

            _context.Entry(hurtownia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HurtowniaExists(id))
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

        // POST: api/Hurtownias
        [HttpPost]
        public async Task<IActionResult> PostHurtownia([FromBody] Hurtownia hurtownia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Hurtownia.Add(hurtownia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHurtownia", new { id = hurtownia.IdHurtownia }, hurtownia);
        }

        // DELETE: api/Hurtownias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHurtownia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var hurtownia = await _context.Hurtownia.FindAsync(id);
            if (hurtownia == null)
            {
                return NotFound();
            }

            _context.Hurtownia.Remove(hurtownia);
            await _context.SaveChangesAsync();

            return Ok(hurtownia);
        }

        private bool HurtowniaExists(int id)
        {
            return _context.Hurtownia.Any(e => e.IdHurtownia == id);
        }
    }
}