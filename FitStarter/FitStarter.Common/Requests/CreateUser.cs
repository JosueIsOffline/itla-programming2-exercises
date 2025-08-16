using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitStarter.Common.Requests
{
    public record CreateUser
    {
        public string FullName { get; init; } = string.Empty;
        public string Email { get; init; } = string.Empty;
        public string Password { get; init; } = string.Empty;
        public decimal? WeightKg { get; init; }
        public int? HeightCm { get; init; }
        public string FitnessGoal { get; init; } = "stay_fit";
        public string ExperienceLevel { get; init; } = "beginner";
    }
}
