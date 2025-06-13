namespace FitStarter.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public decimal? WeightKg { get; set; }
        public int? HeightCm { get; set; }
        public string FitnessGoal { get; set; } = "stay_fit";
        public string ExperienceLevel { get; set; } = "beginner";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true; 
    }
}
