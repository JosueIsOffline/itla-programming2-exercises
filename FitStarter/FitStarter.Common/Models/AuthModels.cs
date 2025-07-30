namespace FitStarter.Domain.Models
{
    
    public class UserInfo
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FitnessGoal { get; set; } = string.Empty;
        public string ExperienceLevel { get; set; } = string.Empty;
    }

    

    public class TokenValidationResult
    {
        public bool IsValid { get; set; }
        public int? UserId { get; set; }
        public string? Error { get; set; }
    }
}