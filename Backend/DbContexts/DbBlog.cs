using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.DbContexts
{
    public class DbBlog : DbContext
    {
        public DbSet<Log> Logs { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbBlog(DbContextOptions<DbBlog> options) : base(options)
        {

        }
    }
}