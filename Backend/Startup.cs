using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.DbContexts;
using Backend.Interfaces;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

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
            services.AddDetection();
            services.AddScoped<IDelayService, DelayService>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        RequireExpirationTime = true,
                        ValidIssuer = Configuration["Tokens:ValidIssuer"],
                        ValidAudience = Configuration["Tokens:ValidAudience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(Configuration["Tokens:IssuerSigningKey"]))
                    };
                    options.Events = new JwtBearerEvents(){
                        OnAuthenticationFailed = context => 
                        {
                            context.NoResult();
                            context.Response.StatusCode = 401;
                            context.Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = context.Exception.Message;
                            return Task.CompletedTask;
                        },
                        OnTokenValidated = context => {
                            return Task.CompletedTask;
                        }
                    };
                });
            services.AddHttpContextAccessor();
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
