namespace FitStarter.Application.Contracts
{
   
    public record UpdateUser
    {
        public string? FullName { get; init; }
        public string? Email { get; init; }
        public string? Password { get; init; } 
        public decimal? WeightKg { get; init; }
        public int? HeightCm { get; init; }
        public string? FitnessGoal { get; init; }
        public string? ExperienceLevel { get; init; }
        public bool? IsActive { get; init; }
    }

    
    public record GetUser
    {
        public int Id { get; init; }
        //public string FullName { get; init; } = string.Empty;
        //public string Email { get; init; } = string.Empty;
        //public decimal? WeightKg { get; init; }
        //public int? HeightCm { get; init; }
        //public string FitnessGoal { get; init; } = string.Empty;
        //public string ExperienceLevel { get; init; } = string.Empty;
        //public DateTime CreatedAt { get; init; }
        //public bool IsActive { get; init; }
    }

    public class GetUserDto
    {
        public int Id { get; init; }
        public string FullName { get; init; }
        public string Email { get; init; } 
        public decimal? WeightKg { get; init; }
        public int? HeightCm { get; init; }
        public string FitnessGoal { get; init; } 
        public string ExperienceLevel { get; init; } 
        public DateTime CreatedAt { get; init; }
        public bool IsActive { get; init; }
    }


    public record DeleteUser
    {
        public int Id { get; init; }
    }
}
