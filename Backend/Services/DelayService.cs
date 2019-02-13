using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Backend.Interfaces;

namespace Backend.Services
{
    public class DelayService: IDelayService
    {
        private readonly IConfiguration _config;

        public DelayService(IConfiguration config)
        {
            _config = config;
        }

        public void Wait(int time = 1000)
        {
            if(_config["Mode"] == "Debug")
            {
                Task.Delay(time).Wait();
            }
        }
    }
}