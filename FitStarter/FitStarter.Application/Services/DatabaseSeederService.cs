using FitStarter.Infrastructure.Data;
using FitStarter.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FitStarter.Application.Services
{
    public interface IDatabaseSeederService
    {
        Task SeedDatabaseAsync();
    }

    public class DatabaseSeederService : IDatabaseSeederService
    {
        private readonly AppDbContext _context;

        public DatabaseSeederService(AppDbContext context)
        {
            _context = context;
        }

        public async Task SeedDatabaseAsync()
        {
            await SeedExercisesAsync();
            await SeedNutritionTipsAsync();
        }

        private async Task SeedExercisesAsync()
        {
            if (await _context.Exercises.AnyAsync())
            {
                return; // Already seeded
            }

            var exercises = new List<Exercise>
            {
                new Exercise
                {
                    Name = "Flexiones",
                    MuscleGroup = "Pecho, Brazos",
                    ExerciseType = "strength",
                    DurationMinutes = 10,
                    CaloriesPerMinute = 8,
                    Description = "Ejercicio clásico para fortalecer el tren superior",
                    Instructions = "Colócate en posición de plancha, baja el pecho al suelo y empuja hacia arriba",
                    EquipmentNeeded = "Ninguno",
                    Difficulty = "beginner"
                },
                new Exercise
                {
                    Name = "Sentadillas",
                    MuscleGroup = "Piernas, Glúteos",
                    ExerciseType = "strength",
                    DurationMinutes = 10,
                    CaloriesPerMinute = 6,
                    Description = "Ejercicio fundamental para el tren inferior",
                    Instructions = "Pies separados al ancho de hombros, baja como si te sentaras en una silla",
                    EquipmentNeeded = "Ninguno",
                    Difficulty = "beginner"
                },
                new Exercise
                {
                    Name = "Plancha",
                    MuscleGroup = "Core",
                    ExerciseType = "strength",
                    DurationMinutes = 5,
                    CaloriesPerMinute = 5,
                    Description = "Ejercicio isométrico para fortalecer el core",
                    Instructions = "Mantén la posición de plancha sobre los antebrazos",
                    EquipmentNeeded = "Ninguno",
                    Difficulty = "beginner"
                },
                new Exercise
                {
                    Name = "Jumping Jacks",
                    MuscleGroup = "Todo el cuerpo",
                    ExerciseType = "cardio",
                    DurationMinutes = 10,
                    CaloriesPerMinute = 10,
                    Description = "Ejercicio cardiovascular de cuerpo completo",
                    Instructions = "Salta separando las piernas y levantando los brazos",
                    EquipmentNeeded = "Ninguno",
                    Difficulty = "beginner"
                },
                new Exercise
                {
                    Name = "Burpees",
                    MuscleGroup = "Todo el cuerpo",
                    ExerciseType = "cardio",
                    DurationMinutes = 10,
                    CaloriesPerMinute = 15,
                    Description = "Ejercicio de alta intensidad",
                    Instructions = "Sentadilla, salto atrás a plancha, flexión, salto adelante, salto vertical",
                    EquipmentNeeded = "Ninguno",
                    Difficulty = "intermediate"
                },
                new Exercise
                {
                    Name = "Estiramiento",
                    MuscleGroup = "Todo el cuerpo",
                    ExerciseType = "flexibility",
                    DurationMinutes = 15,
                    CaloriesPerMinute = 2,
                    Description = "Rutina de estiramientos básicos",
                    Instructions = "Realiza estiramientos suaves manteniendo cada posición",
                    EquipmentNeeded = "Ninguno",
                    Difficulty = "beginner"
                },
                new Exercise
                {
                    Name = "Zancadas",
                    MuscleGroup = "Piernas, Glúteos",
                    ExerciseType = "strength",
                    DurationMinutes = 10,
                    CaloriesPerMinute = 7,
                    Description = "Ejercicio unilateral para piernas",
                    Instructions = "Da un paso largo hacia adelante y baja la rodilla trasera",
                    EquipmentNeeded = "Ninguno",
                    Difficulty = "beginner"
                },
                new Exercise
                {
                    Name = "Mountain Climbers",
                    MuscleGroup = "Todo el cuerpo",
                    ExerciseType = "cardio",
                    DurationMinutes = 5,
                    CaloriesPerMinute = 12,
                    Description = "Ejercicio cardiovascular de alta intensidad",
                    Instructions = "En posición de plancha, alterna llevando las rodillas al pecho",
                    EquipmentNeeded = "Ninguno",
                    Difficulty = "intermediate"
                }
            };

            await _context.Exercises.AddRangeAsync(exercises);
            await _context.SaveChangesAsync();
        }

        private async Task SeedNutritionTipsAsync()
        {
            if (await _context.NutritionTips.AnyAsync())
            {
                return; // Already seeded
            }

            var nutritionTips = new List<NutritionTip>
            {
                new NutritionTip
                {
                    Title = "Hidratación Pre-Entreno",
                    Content = "Bebe 500ml de agua 2-3 horas antes de entrenar para estar bien hidratado",
                    Category = "pre_workout",
                    TargetGoal = "all"
                },
                new NutritionTip
                {
                    Title = "Energía Rápida",
                    Content = "Come una banana 30 minutos antes del ejercicio para obtener energía rápida",
                    Category = "pre_workout",
                    TargetGoal = "all"
                },
                new NutritionTip
                {
                    Title = "Recuperación Muscular",
                    Content = "Consume proteína dentro de los 30 minutos después del entrenamiento",
                    Category = "post_workout",
                    TargetGoal = "gain_muscle"
                },
                new NutritionTip
                {
                    Title = "Hidratación Constante",
                    Content = "Bebe al menos 8 vasos de agua al día para mantener una hidratación óptima",
                    Category = "hydration",
                    TargetGoal = "all"
                },
                new NutritionTip
                {
                    Title = "Déficit Calórico",
                    Content = "Para perder peso, crea un pequeño déficit calórico comiendo un poco menos y moviéndote más",
                    Category = "general",
                    TargetGoal = "lose_weight"
                },
                new NutritionTip
                {
                    Title = "Proteína en Cada Comida",
                    Content = "Incluye una fuente de proteína en cada comida: pollo, pescado, huevos, legumbres",
                    Category = "general",
                    TargetGoal = "gain_muscle"
                },
                new NutritionTip
                {
                    Title = "Carbohidratos Complejos",
                    Content = "Los carbohidratos como avena, quinoa y batata proporcionan energía duradera",
                    Category = "general",
                    TargetGoal = "build_endurance"
                },
                new NutritionTip
                {
                    Title = "Leche con Chocolate",
                    Content = "La leche con chocolate es una excelente bebida post-entreno con carbohidratos y proteínas",
                    Category = "post_workout",
                    TargetGoal = "all"
                },
                new NutritionTip
                {
                    Title = "Comidas Balanceadas",
                    Content = "Combina proteínas, carbohidratos y grasas saludables en tus comidas principales",
                    Category = "general",
                    TargetGoal = "all"
                },
                new NutritionTip
                {
                    Title = "Evita Entrenar en Ayunas",
                    Content = "Si entrenas por la mañana, come algo ligero para tener energía",
                    Category = "pre_workout",
                    TargetGoal = "all"
                }
            };

            await _context.NutritionTips.AddRangeAsync(nutritionTips);
            await _context.SaveChangesAsync();
        }
    }
}
