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
    public class PracowniksController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public PracowniksController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/Pracowniks
        [HttpGet]
        public IEnumerable<Pracownik> GetPracownik()
        {
            return _context.Pracownik;
        }

        // GET: api/Pracowniks/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPracownik([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pracownik = await _context.Pracownik.FindAsync(id);

            if (pracownik == null)
            {
                return NotFound();
            }

            return Ok(pracownik);
        }

        // PUT: api/Pracowniks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPracownik([FromRoute] int id, [FromBody] Pracownik pracownik)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pracownik.IdPracownika)
            {
                return BadRequest();
            }

            _context.Entry(pracownik).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PracownikExists(id))
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

        // POST: api/Pracowniks
        [HttpPost]
        public async Task<IActionResult> PostPracownik([FromBody] Pracownik pracownik)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Pracownik.Add(pracownik);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPracownik", new { id = pracownik.IdPracownika }, pracownik);
        }

        // DELETE: api/Pracowniks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePracownik([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pracownik = await _context.Pracownik.FindAsync(id);
            if (pracownik == null)
            {
                return NotFound();
            }

            _context.Pracownik.Remove(pracownik);
            await _context.SaveChangesAsync();

            return Ok(pracownik);
        }

        private bool PracownikExists(int id)
        {
            return _context.Pracownik.Any(e => e.IdPracownika == id);
        }
    }
}