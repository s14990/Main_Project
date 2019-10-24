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
    public class KategoriasController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public KategoriasController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/Kategorias
        [HttpGet]
        public IEnumerable<Kategoria> GetKategoria()
        {
            return _context.Kategoria;
        }

        // GET: api/Kategorias/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetKategoria([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var kategoria = await _context.Kategoria.FindAsync(id);

            if (kategoria == null)
            {
                return NotFound();
            }

            return Ok(kategoria);
        }

        // PUT: api/Kategorias/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKategoria([FromRoute] int id, [FromBody] Kategoria kategoria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != kategoria.IdKategoria)
            {
                return BadRequest();
            }

            _context.Entry(kategoria).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KategoriaExists(id))
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

        // POST: api/Kategorias
        [HttpPost]
        public async Task<IActionResult> PostKategoria([FromBody] Kategoria kategoria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Kategoria.Add(kategoria);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKategoria", new { id = kategoria.IdKategoria }, kategoria);
        }

        // DELETE: api/Kategorias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKategoria([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var kategoria = await _context.Kategoria.FindAsync(id);
            if (kategoria == null)
            {
                return NotFound();
            }

            _context.Kategoria.Remove(kategoria);
            await _context.SaveChangesAsync();

            return Ok(kategoria);
        }

        private bool KategoriaExists(int id)
        {
            return _context.Kategoria.Any(e => e.IdKategoria == id);
        }
    }
}