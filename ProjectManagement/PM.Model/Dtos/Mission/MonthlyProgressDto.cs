using Infrastructure.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Model.Dtos.Mission
{
    public class MonthlyProgressDto : IDto
    {
        public int Month { get; set; } 
        public int TasksCompleted { get; set; } 
        public int TasksPending { get; set; } 
    }
}
