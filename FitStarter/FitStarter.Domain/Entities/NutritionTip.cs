namespace FitStarter.Domain.Entities
{
    public class NutritionTip
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Category { get; set; } = "general"; // pre_workout, post_workout, general, hydration
        public string TargetGoal { get; set; } = "all"; // lose_weight, gain_muscle, stay_fit, build_endurance, all
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
