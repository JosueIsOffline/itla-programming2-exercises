namespace FitStarter.Application.Contracts
{
    public record CreateWorkoutSession
    {
        public int UserId { get; init; }
        public int ExerciseId { get; init; }
        public DateTime SessionDate { get; init; } = DateTime.UtcNow.Date;
        public int DurationMinutes { get; init; }
        public int CaloriesBurned { get; init; }
        public bool Completed { get; init; } = false;
        public string Notes { get; init; } = string.Empty;
    }

    public record UpdateWorkoutSession
    {
        public int DurationMinutes { get; init; }
        public int CaloriesBurned { get; init; }
        public bool Completed { get; init; }
        public string Notes { get; init; } = string.Empty;
    }

    public class WorkoutSessionDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ExerciseId { get; set; }
        public DateTime SessionDate { get; set; }
        public int DurationMinutes { get; set; }
        public int CaloriesBurned { get; set; }
        public bool Completed { get; set; }
        public string Notes { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        // Related data
        public string? ExerciseName { get; set; }
        public string? UserName { get; set; }
    }

    public class WorkoutStatsDto
    {
        public int TotalWorkouts { get; set; }
        public int TotalMinutes { get; set; }
        public int TotalCalories { get; set; }
        public int CurrentStreak { get; set; }
        public DateTime? LastWorkoutDate { get; set; }
    }
}
