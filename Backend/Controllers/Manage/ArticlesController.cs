using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DbContexts;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Manage.Controllers
{
    [Route("api/manage/[controller]")]
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
            // 模擬長時間的載入
            System.Threading.Tasks.Task.Delay(1000).Wait();
            return Ok(new {
                articles = _context.Articles
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
            // 模擬長時間的載入
            System.Threading.Tasks.Task.Delay(1000).Wait();
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

        // PUT: api/Articles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Article article)
        {
            // 模擬長時間的載入
            System.Threading.Tasks.Task.Delay(1000).Wait();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != article.Id)
            {
                return BadRequest();
            }

            _context.Entry(article).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Articles.Any(e => e.Id == id))
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

        // POST: api/Articles
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Article article)
        {
            // 模擬長時間的載入
            System.Threading.Tasks.Task.Delay(1000).Wait();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Find", new { id = article.Id }, article);
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            // 模擬長時間的載入
            System.Threading.Tasks.Task.Delay(1000).Wait();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return Ok(article);
        }
    }
}
