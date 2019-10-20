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
    public class UserSessionsController : ControllerBase
    {
        private readonly AptekaMainContext _context;

        public UserSessionsController(AptekaMainContext context)
        {
            _context = context;
        }

        // GET: api/UserSessions
        [HttpGet]
        public IEnumerable<UserSession> GetUserSession()
        {
            return _context.UserSession;
        }

        // GET: api/UserSessions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserSession([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userSession = await _context.UserSession.FindAsync(id);

            if (userSession == null)
            {
                return NotFound();
            }

            return Ok(userSession);
        }

        // PUT: api/UserSessions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserSession([FromRoute] int id, [FromBody] UserSession userSession)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userSession.IdSession)
            {
                return BadRequest();
            }

            _context.Entry(userSession).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserSessionExists(id))
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

        
        // POST: api/UserSessions
        [HttpPost]
        public async Task<IActionResult> PostUserSession([FromBody] User user_login)
        {
            var email = user_login.Email;
            var password = user_login.Password;
            var user=await _context.Pracownik.SingleOrDefaultAsync(u => u.Email == email);

            if(user == null)
            {
                return NotFound();
            }
            if (user.Haslo != password)
            {
                return BadRequest(new {errors="WrongPassword" });
            }
            // _context.UserSession.Add(userSession);
            await _context.SaveChangesAsync();

            UserSession us = new UserSession() { PracownikIdPracownika=user.IdPracownika,Access=user.PoziomDostępu,Active=true} ;
            //_context.UserSession.Add(us);
            //await _context.SaveChangesAsync();


            return CreatedAtAction("GetUserSession", new { id = us.IdSession }, us);
        }
        
        // DELETE: api/UserSessions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserSession([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userSession = await _context.UserSession.FindAsync(id);
            if (userSession == null)
            {
                return NotFound();
            }

            _context.UserSession.Remove(userSession);
            await _context.SaveChangesAsync();

            return Ok(userSession);
        }

        private bool UserSessionExists(int id)
        {
            return _context.UserSession.Any(e => e.IdSession == id);
        }
    }
}