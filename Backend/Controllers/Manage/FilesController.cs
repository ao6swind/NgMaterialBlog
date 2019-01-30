using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Backend.DbContexts;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Backend.Manage.Controllers
{
    [Route("api/manage/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        [HttpPost]
        public IActionResult  UploadImage(IFormFile upload, string CKEditorFuncNum, string CKEditor, string langCode)
        {                  
            if (upload.Length <= 0 ) return null;
            string message = String.Empty;
            string fileName = Guid.NewGuid() + Path.GetExtension(upload.FileName).ToLower();
            string filePath = Path.Combine(
                Directory.GetCurrentDirectory(), 
                "wwwroot/images",
                fileName
            );

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                upload.CopyTo(stream);
            }
            string imgUrl = Url.Content($"~/images/{fileName}");
            
            string result = $"<html><body><script>window.parent.CKEDITOR.tools.callFunction({CKEditorFuncNum}, '{imgUrl}', '{message}');</script></body></html>";
            return Ok();
        }
    }
}
