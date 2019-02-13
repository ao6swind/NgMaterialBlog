using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Backend.DbContexts;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Homepage.Controllers
{
    [Route("api/homepage/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DbBlog _context;
        private readonly IConfiguration _config;
        public UsersController(DbBlog context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("regist")]
        public async Task<IActionResult> Regist([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Signin", user);
        }

        // GET: api/Articles/5
        [HttpPost("signin")]
        public async Task<IActionResult> Signin([FromBody] User user)
        {
            User userAuthed = await _context.Users.SingleOrDefaultAsync(x => x.Account == user.Account && x.Password == user.Password);
            if(userAuthed != null)
            {
                var claims = new []
                {
                    new Claim(JwtRegisteredClaimNames.NameId, userAuthed.Account),
                    new Claim(ClaimTypes.Name, userAuthed.Name)
                };
                var token = new JwtSecurityToken
                (
                    issuer: _config["Tokens:ValidIssuer"],
                    audience: _config["Tokens:ValidAudience"],
                    claims: claims,
                    expires: DateTime.Now.AddDays(7),
                    signingCredentials: new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.Default.GetBytes(_config["Tokens:IssuerSigninkKey"])), 
                        SecurityAlgorithms.HmacSha256
                    )
                );

                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
            }
            else
            {
                return NotFound();
            }
        }
    }
}
