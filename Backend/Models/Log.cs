using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Backend.Models
{
    public class Log
    {
        public int Id { get; set; }
        public string User { get; set; }
        public string IpAddress { get; set; }
        public string Agent { get; set; }
        public string Device { get; set; }
        public string System { get; set; }
        public string Browser { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public LogAction Action { get; set; }
        public string Target { get; set; }
        public string Data { get; set; }
        public DateTime ActionTime { get; set; }
    }

    public enum LogAction 
    {
        Create,
        Update,
        Delete,
        Export,
        Import,
        Signin,
        Signout
    }
}