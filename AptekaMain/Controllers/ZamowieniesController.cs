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
    public class ZamowieniesController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public ZamowieniesController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/Zamowienies
        [HttpGet]
        public IEnumerable<Zamowienie> GetZamowienie()
        {
            return _context.Zamowienie;
        }

        // GET: api/Zamowienies/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetZamowienie([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var zamowienie = await _context.Zamowienie.FindAsync(id);

            if (zamowienie == null)
            {
                return NotFound();
            }

            return Ok(zamowienie);
        }

        // PUT: api/Zamowienies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutZamowienie([FromRoute] int id, [FromBody] Zamowienie zamowienie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != zamowienie.IdZamowienia)
            {
                return BadRequest();
            }

            _context.Entry(zamowienie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ZamowienieExists(id))
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

        // POST: api/Zamowienies
        [HttpPost]
        public async Task<IActionResult> PostZamowienie([FromBody] Zamowienie zamowienie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Zamowienie.Add(zamowienie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetZamowienie", new { id = zamowienie.IdZamowienia }, zamowienie);
        }

        // DELETE: api/Zamowienies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteZamowienie([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var zamowienie = await _context.Zamowienie.FindAsync(id);
            if (zamowienie == null)
            {
                return NotFound();
            }

            _context.Zamowienie.Remove(zamowienie);
            await _context.SaveChangesAsync();

            return Ok(zamowienie);
        }

        private bool ZamowienieExists(int id)
        {
            return _context.Zamowienie.Any(e => e.IdZamowienia == id);
        }
    }
}