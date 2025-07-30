namespace FitStarter.Application.Contracts
{
        public record CreateRoutine
        {
            public string Name { get; init; }
            public string Description { get; init; }
            public string Difficulty { get; init; } = "beginner";
            public int DurationInMinutes { get; init; }
            public string TargetGoal { get; init; } = "stay_fit";
        }

        public record UpdateRoutine
        {
            public int Id { get; init; }
            public string Name { get; init; }
            public string Description { get; init; }
            public string Difficulty { get; init; } = "beginner";
            public int DurationInMinutes { get; init; }
            public string TargetGoal { get; init; } = "stay_fit";
        }

        
        public record GetRoutine
        {
            public int Id { get; init; }
        }

        public class GetRoutineDto
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string Difficulty { get; set; } = "beginner";
            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public int DurationInMinutes { get; set; }
            public string TargetGoal { get; set; } = "stay_fit";
            public bool IsActive { get; set; } = true;
        }

        public record DeleteRoutine
        {
            public int Id { get; init; }
        }

}
