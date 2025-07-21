namespace FitStarter.Domain.Contracts
{
    public record CreateUserProgress
    {
        public int UserId { get; init; }
        public DateTime RecordDate { get; init; } = DateTime.UtcNow.Date;
        public decimal? WeightKg { get; init; }
        public decimal? BodyFatPercent { get; init; }
        public string Notes { get; init; } = string.Empty;
    }

    public record UpdateUserProgress
    {
        public decimal? WeightKg { get; init; }
        public decimal? BodyFatPercent { get; init; }
        public string Notes { get; init; } = string.Empty;
    }

    public class UserProgressDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime RecordDate { get; set; }
        public decimal? WeightKg { get; set; }
        public decimal? BodyFatPercent { get; set; }
        public string Notes { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class ProgressSummaryDto
    {
        public decimal? CurrentWeight { get; set; }
        public decimal? StartingWeight { get; set; }
        public decimal? WeightChange { get; set; }
        public int TotalEntries { get; set; }
        public DateTime? LastRecordDate { get; set; }
        public List<UserProgressDto> RecentEntries { get; set; } = new();
    }
}
