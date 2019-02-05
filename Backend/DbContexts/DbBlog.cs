using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Backend.DbContexts
{
    public class DbBlog : DbContext
    {
        private readonly IHttpContextAccessor _context;
        public DbSet<Log> Logs { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbBlog(DbContextOptions<DbBlog> options, IHttpContextAccessor context) : base(options)
        {
            _context = context;
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            var modifiedEntities = ChangeTracker.Entries().ToList();
            var now = DateTime.Now;

            foreach (var entity in modifiedEntities)
            {
                Log log = new Log();
                log.User = "user";
                log.IpAddress = _context.HttpContext.Connection.RemoteIpAddress.ToString();
                log.Device = _context.HttpContext.Request.Headers["User-Agent"].ToString();
                log.System = _context.HttpContext.Request.Headers["User-Agent"].ToString();
                log.Browser = _context.HttpContext.Request.Headers["User-Agent"].ToString();
                log.Data = JsonConvert.SerializeObject(entity.OriginalValues.ToObject());
                log.Target = entity.Entity.GetType().Name;
                log.ActionTime = now;
                switch(entity.State)
                {
                    case EntityState.Added:
                        log.Action = LogAction.Create;
                        break;
                    case EntityState.Modified:
                        log.Action = LogAction.Update;
                        break;
                    case EntityState.Deleted:
                        log.Action = LogAction.Delete;
                        break;
                }
                Logs.Add(log);
            }
            return (await base.SaveChangesAsync(true, cancellationToken));
        }
    }
}