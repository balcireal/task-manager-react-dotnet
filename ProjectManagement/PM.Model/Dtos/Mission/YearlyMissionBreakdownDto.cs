using Infrastructure.Model;

namespace TaskManagement.Model.Dtos.Mission
{
    public class YearlyMissionBreakdownDto : IDto
    {
        public int CompletedTasks { get; set; }
        public int PendingTasks { get; set; }
        public int OtherTasks { get; set; }
    }
}
