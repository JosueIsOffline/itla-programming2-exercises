using FitStarter.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FitStarter.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Routine> Routines { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<WorkoutSession> WorkoutSessions { get; set; }
        public DbSet<UserProgress> UserProgresses { get; set; }
        public DbSet<NutritionTip> NutritionTips { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User relationships
            modelBuilder.Entity<RefreshToken>()
                .HasOne(rt => rt.User)
                .WithMany(rt => rt.RefreshTokens)
                .HasForeignKey(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WorkoutSession>()
                .HasOne(ws => ws.User)
                .WithMany()
                .HasForeignKey(ws => ws.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserProgress>()
                .HasOne(up => up.User)
                .WithMany()
                .HasForeignKey(up => up.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Exercise relationships
            modelBuilder.Entity<WorkoutSession>()
                .HasOne(ws => ws.Exercise)
                .WithMany(e => e.WorkoutSessions)
                .HasForeignKey(ws => ws.ExerciseId)
                .OnDelete(DeleteBehavior.Restrict);

            // Indexes
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<WorkoutSession>()
                .HasIndex(ws => new { ws.UserId, ws.SessionDate });

            modelBuilder.Entity<UserProgress>()
                .HasIndex(up => new { up.UserId, up.RecordDate });

            modelBuilder.Entity<Exercise>()
                .HasIndex(e => e.ExerciseType);

            modelBuilder.Entity<NutritionTip>()
                .HasIndex(nt => new { nt.Category, nt.TargetGoal });

            base.OnModelCreating(modelBuilder);
        }
    }
}
