namespace Backend.Interfaces
{
    public interface IDelayService
    {
        void Wait(int time = 1000);   
    }
}