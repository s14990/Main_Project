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
    public class ListaBrakowsController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public ListaBrakowsController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/ListaBrakows
        [HttpGet]
        public IEnumerable<ListaBrakow> GetListaBrakow()
        {
            return _context.ListaBrakow;
        }

        // GET: api/ListaBrakows/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetListaBrakow([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var listaBrakow = await _context.ListaBrakow.FindAsync(id);

            if (listaBrakow == null)
            {
                return NotFound();
            }

            return Ok(listaBrakow);
        }

        // PUT: api/ListaBrakows/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListaBrakow([FromRoute] int id, [FromBody] ListaBrakow listaBrakow)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != listaBrakow.IdLista)
            {
                return BadRequest();
            }

            _context.Entry(listaBrakow).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListaBrakowExists(id))
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

        // POST: api/ListaBrakows
        [HttpPost]
        public async Task<IActionResult> PostListaBrakow([FromBody] ListaBrakow listaBrakow)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ListaBrakow.Add(listaBrakow);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetListaBrakow", new { id = listaBrakow.IdLista }, listaBrakow);
        }

        // DELETE: api/ListaBrakows/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListaBrakow([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var listaBrakow = await _context.ListaBrakow.FindAsync(id);
            if (listaBrakow == null)
            {
                return NotFound();
            }

            _context.ListaBrakow.Remove(listaBrakow);
            await _context.SaveChangesAsync();

            return Ok(listaBrakow);
        }

        private bool ListaBrakowExists(int id)
        {
            return _context.ListaBrakow.Any(e => e.IdLista == id);
        }
    }
}