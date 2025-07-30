namespace FitStarter.Domain.Entities
{
    public class WorkoutSession
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ExerciseId { get; set; }
        public DateTime SessionDate { get; set; } = DateTime.UtcNow.Date;
        public int DurationMinutes { get; set; }
        public int CaloriesBurned { get; set; }
        public bool Completed { get; set; } = false;
        public string Notes { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public User User { get; set; } = null!;
        public Exercise Exercise { get; set; } = null!;
    }
}
