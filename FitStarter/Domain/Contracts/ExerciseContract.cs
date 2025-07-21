namespace FitStarter.Domain.Contracts
{
    public record CreateExercise
    {
        public string Name { get; init; } = string.Empty;
        public string MuscleGroup { get; init; } = string.Empty;
        public string ExerciseType { get; init; } = "strength";
        public int DurationMinutes { get; init; } = 5;
        public int CaloriesPerMinute { get; init; } = 5;
        public string Description { get; init; } = string.Empty;
        public string Instructions { get; init; } = string.Empty;
        public string EquipmentNeeded { get; init; } = string.Empty;
        public string Difficulty { get; init; } = "beginner";
    }

    public record UpdateExercise
    {
        public string Name { get; init; } = string.Empty;
        public string MuscleGroup { get; init; } = string.Empty;
        public string ExerciseType { get; init; } = "strength";
        public int DurationMinutes { get; init; } = 5;
        public int CaloriesPerMinute { get; init; } = 5;
        public string Description { get; init; } = string.Empty;
        public string Instructions { get; init; } = string.Empty;
        public string EquipmentNeeded { get; init; } = string.Empty;
        public string Difficulty { get; init; } = "beginner";
        public bool IsActive { get; init; } = true;
    }

    public class ExerciseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string MuscleGroup { get; set; } = string.Empty;
        public string ExerciseType { get; set; } = "strength";
        public int DurationMinutes { get; set; } = 5;
        public int CaloriesPerMinute { get; set; } = 5;
        public string Description { get; set; } = string.Empty;
        public string Instructions { get; set; } = string.Empty;
        public string EquipmentNeeded { get; set; } = string.Empty;
        public string Difficulty { get; set; } = "beginner";
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
    }
}
