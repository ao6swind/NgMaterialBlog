using System;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Wangkanai.Detection;

namespace Backend.DbContexts
{
    public class DbBlog : DbContext
    {
        private readonly IHttpContextAccessor _context;
        private readonly IDetection _detection;
        public DbSet<Log> Logs { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbBlog(DbContextOptions<DbBlog> options, IHttpContextAccessor context, IDetection detection) : base(options)
        {
            _context = context;
            _detection = detection;
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            var modifiedEntities = ChangeTracker.Entries().ToList();
            var now = DateTime.Now;

            foreach (var entity in modifiedEntities)
            {
                Log log = new Log();
                
                switch(entity.State)
                {
                    case EntityState.Added:
                        log.Action = LogAction.Create;
                        entity.Property("CreatedAt").CurrentValue = DateTime.Now;
                        entity.Property("UpdatedAt").CurrentValue = DateTime.Now;
                        break;
                    case EntityState.Modified:
                        log.Action = LogAction.Update;
                        entity.Property("UpdatedAt").CurrentValue = DateTime.Now;
                        break;
                    case EntityState.Deleted:
                        log.Action = LogAction.Delete;
                        break;
                }
                
                log.User = "user";
                log.IpAddress = _context.HttpContext.Connection.RemoteIpAddress.ToString();
                log.Agent = _context.HttpContext.Request.Headers["User-Agent"].ToString();
                log.Device = _detection.Device.Type.ToString();
                log.System = _detection.Platform?.Type.ToString();
                log.Browser = _detection.Browser?.Type.ToString() + _detection.Crawler?.Type.ToString() + _detection.Engine?.Type.ToString();
                log.Data = JsonConvert.SerializeObject(entity.OriginalValues.ToObject());
                log.Target = entity.Entity.GetType().Name;
                log.ActionTime = now;
                Debug.Write(_detection);
                Logs.Add(log);
            }
            return (await base.SaveChangesAsync(true, cancellationToken));
        }
    }
}