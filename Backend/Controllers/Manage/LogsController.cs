using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DbContexts;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Manage.Controllers
{
    [Route("api/manage/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly DbBlog _context;
        private readonly IDelayService _delay;
        public LogsController(DbBlog context, IDelayService delay)
        {
            _context = context;
            _delay = delay;
        }

        // GET: api/Logs/1/10
        [HttpGet("{page}/{size}")]
        public IActionResult List(int page, int size)
        {
            // 模擬長時間的載入
            _delay.Wait();

            return Ok(new {
                data = _context.Logs
                    .OrderByDescending(x => x.Id)
                    .Skip((page - 1) * size)
                    .Take(size)
                    .ToList(),
                count = _context.Logs.ToList().Count
            });
        }

        // GET: api/Logs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Find([FromRoute] int id)
        {
            // 模擬長時間的載入
            _delay.Wait();
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var log = await _context.Logs.FindAsync(id);

            if (log == null)
            {
                return NotFound();
            }

            return Ok(log);
        }
    }
}
