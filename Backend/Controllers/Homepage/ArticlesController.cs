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
    public class ArticlesController : ControllerBase
    {
        private readonly DbBlog _context;
        public ArticlesController(DbBlog context)
        {
            _context = context;
        }

        // GET: api/Articles/1/10
        [HttpGet("{page}/{size}")]
        public IActionResult List(int page, int size)
        {
            return Ok(new {
                articles = _context.Articles
                    .Where(x => x.PublicDate <= DateTime.Now)
                    .Skip((page - 1) * size)
                    .Take(size)
                    .OrderByDescending(x => x.Id)
                    .ToList(),
                count = _context.Articles.ToList().Count
            });
        }

        // GET: api/Articles/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Find([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
        }
    }
}
