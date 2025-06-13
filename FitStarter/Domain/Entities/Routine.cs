namespace FitStarter.Domain.Entities
{
    public class Routine
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
}
