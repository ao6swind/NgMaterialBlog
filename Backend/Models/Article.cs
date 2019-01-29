using System;

namespace Backend.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string CoverImage { get; set; }
        public DateTime PublicDate { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}