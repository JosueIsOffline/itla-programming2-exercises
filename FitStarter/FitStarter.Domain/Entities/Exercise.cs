namespace FitStarter.Domain.Entities
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string MuscleGroup { get; set; } = string.Empty;
        public string ExerciseType { get; set; } = "strength"; // cardio, strength, flexibility
        public int DurationMinutes { get; set; } = 5;
        public int CaloriesPerMinute { get; set; } = 5;
        public string Description { get; set; } = string.Empty;
        public string Instructions { get; set; } = string.Empty;
        public string EquipmentNeeded { get; set; } = string.Empty;
        public string Difficulty { get; set; } = "beginner";
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<WorkoutSession> WorkoutSessions { get; set; } = new List<WorkoutSession>();
    }
}
