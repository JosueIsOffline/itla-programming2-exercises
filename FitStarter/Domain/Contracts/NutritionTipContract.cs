namespace FitStarter.Domain.Contracts
{
    public record CreateNutritionTip
    {
        public string Title { get; init; } = string.Empty;
        public string Content { get; init; } = string.Empty;
        public string Category { get; init; } = "general";
        public string TargetGoal { get; init; } = "all";
    }

    public record UpdateNutritionTip
    {
        public string Title { get; init; } = string.Empty;
        public string Content { get; init; } = string.Empty;
        public string Category { get; init; } = "general";
        public string TargetGoal { get; init; } = "all";
        public bool IsActive { get; init; } = true;
    }

    public class NutritionTipDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Category { get; set; } = "general";
        public string TargetGoal { get; set; } = "all";
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
    }
}
