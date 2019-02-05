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
    public class LogsController : ControllerBase
    {
        private readonly DbBlog _context;
        public LogsController(DbBlog context)
        {
            _context = context;
        }

        // GET: api/Logs/1/10
        [HttpGet("{page}/{size}")]
        public IActionResult List(int page, int size)
        {
            // 模擬長時間的載入
            System.Threading.Tasks.Task.Delay(1000).Wait();
            return Ok(new {
                logs = _context.Logs
                    .Skip((page - 1) * size)
                    .Take(size)
                    .OrderByDescending(x => x.Id)
                    .ToList(),
                count = _context.Logs.ToList().Count
            });
        }

        // GET: api/Logs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Find([FromRoute] int id)
        {
            // 模擬長時間的載入
            System.Threading.Tasks.Task.Delay(1000).Wait();
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
