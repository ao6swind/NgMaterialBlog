using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DbContexts;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Homepage.Controllers
{
    [Route("api/homepage/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DbBlog _context;
        public UsersController(DbBlog context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Regist([FromBody] User user)
        {
            System.Threading.Tasks.Task.Delay(1000).Wait();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            user.CreatedAt = DateTime.Now;
            user.UpdatedAt = DateTime.Now;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Signin", user);
        }

        // GET: api/Articles/5
        [HttpPost]
        public async Task<IActionResult> Signin([FromBody] User user)
        {
           

            return Ok();
        }
    }
}
