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
    public class ScanReceptiesController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public ScanReceptiesController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/ScanRecepties
        [HttpGet]
        public IEnumerable<ScanRecepty> GetScanRecepty()
        {
            return _context.ScanRecepty;
        }

        // GET: api/ScanRecepties/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetScanRecepty([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var scanRecepty = await _context.ScanRecepty.FindAsync(id);

            if (scanRecepty == null)
            {
                return NotFound();
            }

            return Ok(scanRecepty);
        }

        // PUT: api/ScanRecepties/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScanRecepty([FromRoute] int id, [FromBody] ScanRecepty scanRecepty)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != scanRecepty.IdScan)
            {
                return BadRequest();
            }

            _context.Entry(scanRecepty).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScanReceptyExists(id))
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

        // POST: api/ScanRecepties
        [HttpPost]
        public async Task<IActionResult> PostScanRecepty([FromForm] ScanRecepty scanRecepty)
        {
           /* if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
           
            */
            _context.ScanRecepty.Add(scanRecepty);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScanRecepty", new { id = scanRecepty.IdScan }, scanRecepty);
        }

        // DELETE: api/ScanRecepties/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScanRecepty([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var scanRecepty = await _context.ScanRecepty.FindAsync(id);
            if (scanRecepty == null)
            {
                return NotFound();
            }

            _context.ScanRecepty.Remove(scanRecepty);
            await _context.SaveChangesAsync();

            return Ok(scanRecepty);
        }

        private bool ScanReceptyExists(int id)
        {
            return _context.ScanRecepty.Any(e => e.IdScan == id);
        }
    }
}