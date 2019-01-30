using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DbContexts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connection = @"Server=(LocalDb)\MSSQLLocalDB;Database=DbBlog;Trusted_Connection=True;ConnectRetryCount=0";
            services.AddDbContext<DbBlog>(options => options.UseSqlServer(connection));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddCors(options => {
                options.AddPolicy("AllowLocalhost", policy=>{
                    policy
                        .WithOrigins("http://localhost:4200")
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            // 支援靜態檔案顯示
            app.UseFileServer();
            // 解決同源
            app.UseCors("AllowLocalhost");
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
