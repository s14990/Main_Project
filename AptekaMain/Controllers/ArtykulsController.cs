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
    public class ArtykulsController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public ArtykulsController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/Artykuls
        [HttpGet]
        public IEnumerable<Artykul> GetArtykul()
        {
            return _context.Artykul;
        }

        // GET: api/Artykuls/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArtykul([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artykul = await _context.Artykul.FindAsync(id);

            if (artykul == null)
            {
                return NotFound();
            }

            return Ok(artykul);
        }

        // PUT: api/Artykuls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtykul([FromRoute] int id, [FromBody] Artykul artykul)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != artykul.IdArtykul)
            {
                return BadRequest();
            }

            _context.Entry(artykul).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtykulExists(id))
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

        // POST: api/Artykuls
        [HttpPost]
        public async Task<IActionResult> PostArtykul([FromBody] Artykul artykul)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Artykul.Add(artykul);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtykul", new { id = artykul.IdArtykul }, artykul);
        }

        // DELETE: api/Artykuls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtykul([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artykul = await _context.Artykul.FindAsync(id);
            if (artykul == null)
            {
                return NotFound();
            }

            _context.Artykul.Remove(artykul);
            await _context.SaveChangesAsync();

            return Ok(artykul);
        }

        private bool ArtykulExists(int id)
        {
            return _context.Artykul.Any(e => e.IdArtykul == id);
        }
    }
}