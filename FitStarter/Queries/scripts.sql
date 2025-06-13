CREATE DATABASE FitStarter;

USE FitStarter;

-- Simple Virtual Sports Trainer Database for SQL Server
-- Streamlined design focusing on core functionality

-- ================================
-- USERS
-- ================================
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    email NVARCHAR(150) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    weight_kg DECIMAL(5,2),
    height_cm INT,
    fitness_goal NVARCHAR(20) CHECK (fitness_goal IN ('lose_weight', 'gain_muscle', 'stay_fit', 'build_endurance')) DEFAULT 'stay_fit',
    experience_level NVARCHAR(20) CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
    created_at DATETIME2 DEFAULT GETDATE(),
    is_active BIT DEFAULT 1
);

-- ================================
-- EXERCISES
-- ================================
CREATE TABLE exercises (
    id INT IDENTITY(1,1) PRIMARY KEY,
    exercise_name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    muscle_group NVARCHAR(50),
    difficulty NVARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
    exercise_type NVARCHAR(20) CHECK (exercise_type IN ('cardio', 'strength', 'flexibility')) DEFAULT 'strength',
    equipment_needed NVARCHAR(100),
    instructions NVARCHAR(MAX),
    duration_minutes INT DEFAULT 5,
    calories_per_minute INT DEFAULT 5,
    is_active BIT DEFAULT 1
);

-- ================================
-- WORKOUT ROUTINES
-- ================================
CREATE TABLE routines (
    id INT IDENTITY(1,1) PRIMARY KEY,
    routine_name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    difficulty NVARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
    total_duration_minutes INT,
    target_goal NVARCHAR(20) CHECK (target_goal IN ('lose_weight', 'gain_muscle', 'stay_fit', 'build_endurance')),
    is_active BIT DEFAULT 1
);

-- ================================
-- ROUTINE EXERCISES (What exercises are in each routine)
-- ================================
CREATE TABLE routine_exercises (
    id INT IDENTITY(1,1) PRIMARY KEY,
    routine_id INT,
    exercise_id INT,
    exercise_order INT,
    sets INT DEFAULT 1,
    reps INT DEFAULT 10,
    duration_seconds INT DEFAULT 60,
    rest_seconds INT DEFAULT 30,
    FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

-- ================================
-- WORKOUT SESSIONS (User's actual workouts)
-- ================================
CREATE TABLE workout_sessions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT,
    routine_id INT,
    session_date DATE,
    start_time TIME,
    end_time TIME,
    total_minutes INT,
    calories_burned INT,
    completed BIT DEFAULT 0,
    user_notes NVARCHAR(MAX),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (routine_id) REFERENCES routines(id)
);

-- ================================
-- PROGRESS TRACKING
-- ================================
CREATE TABLE user_progress (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT,
    record_date DATE,
    weight_kg DECIMAL(5,2),
    body_fat_percent DECIMAL(4,1),
    notes NVARCHAR(MAX),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ================================
-- NUTRITION TIPS
-- ================================
CREATE TABLE nutrition_tips (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tip_title NVARCHAR(150) NOT NULL,
    tip_content NVARCHAR(MAX) NOT NULL,
    tip_category NVARCHAR(20) CHECK (tip_category IN ('pre_workout', 'post_workout', 'general', 'hydration')) DEFAULT 'general',
    target_goal NVARCHAR(20) CHECK (target_goal IN ('lose_weight', 'gain_muscle', 'stay_fit', 'build_endurance', 'all')) DEFAULT 'all',
    is_active BIT DEFAULT 1
);

-- ================================
-- TIMER RECORDS (For tracking workout timers)
-- ================================
CREATE TABLE timer_records (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT,
    session_id INT,
    timer_type NVARCHAR(20) CHECK (timer_type IN ('workout', 'exercise', 'rest')) DEFAULT 'workout',
    duration_seconds INT,
    used_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (session_id) REFERENCES workout_sessions(id)
);

-- ================================
-- SAMPLE DATA
-- ================================

-- Basic exercises
INSERT INTO exercises (exercise_name, description, muscle_group, difficulty, exercise_type, equipment_needed, instructions, duration_minutes, calories_per_minute) VALUES
(N'Push-ups', N'Classic upper body strength exercise', N'Chest, Arms', N'beginner', N'strength', N'None', N'Start in plank position, lower chest to ground, push back up', 5, 6),
(N'Squats', N'Lower body strength exercise', N'Legs, Glutes', N'beginner', N'strength', N'None', N'Stand with feet shoulder-width apart, lower like sitting in chair', 5, 7),
(N'Jumping Jacks', N'Full body cardio exercise', N'Full Body', N'beginner', N'cardio', N'None', N'Jump while spreading legs and raising arms overhead', 3, 10),
(N'Plank', N'Core strengthening exercise', N'Core', N'beginner', N'strength', N'None', N'Hold push-up position on forearms', 3, 4),
(N'Lunges', N'Single leg strength exercise', N'Legs, Glutes', N'beginner', N'strength', N'None', N'Step forward and lower back knee toward ground', 5, 6),
(N'Mountain Climbers', N'High intensity cardio exercise', N'Full Body', N'intermediate', N'cardio', N'None', N'In plank position, alternate bringing knees to chest rapidly', 3, 12),
(N'Burpees', N'Full body high intensity exercise', N'Full Body', N'intermediate', N'cardio', N'None', N'Squat, jump back to plank, push-up, jump feet back, jump up', 5, 15),
(N'Wall Sits', N'Isometric leg exercise', N'Legs', N'beginner', N'strength', N'Wall', N'Lean against wall in sitting position', 3, 5);

-- Basic routines
INSERT INTO routines (routine_name, description, difficulty, total_duration_minutes, target_goal) VALUES
(N'Beginner Quick Start', N'Perfect 15-minute routine for beginners', N'beginner', 15, N'stay_fit'),
(N'Cardio Blast', N'High energy cardio workout', N'intermediate', 20, N'lose_weight'),
(N'Strength Builder', N'Focus on building muscle strength', N'beginner', 25, N'gain_muscle');

-- Routine 1: Beginner Quick Start
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, sets, reps, duration_seconds, rest_seconds) VALUES
(1, 3, 1, 2, 20, 60, 30),  -- Jumping Jacks
(1, 1, 2, 2, 8, 0, 60),    -- Push-ups
(1, 2, 3, 2, 12, 0, 60),   -- Squats
(1, 4, 4, 2, 0, 30, 60);   -- Plank

-- Routine 2: Cardio Blast
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, sets, reps, duration_seconds, rest_seconds) VALUES
(2, 3, 1, 3, 30, 0, 45),   -- Jumping Jacks
(2, 6, 2, 3, 20, 0, 45),   -- Mountain Climbers
(2, 7, 3, 3, 8, 0, 60),    -- Burpees
(2, 2, 4, 2, 15, 0, 30);   -- Squats

-- Routine 3: Strength Builder
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, sets, reps, duration_seconds, rest_seconds) VALUES
(3, 1, 1, 3, 10, 0, 90),   -- Push-ups
(3, 2, 2, 3, 15, 0, 90),   -- Squats
(3, 5, 3, 3, 12, 0, 60),   -- Lunges (each leg)
(3, 4, 4, 3, 0, 45, 60),   -- Plank
(3, 8, 5, 2, 0, 60, 60);   -- Wall Sits

-- Nutrition tips
INSERT INTO nutrition_tips (tip_title, tip_content, tip_category, target_goal) VALUES
(N'Pre-Workout Fuel', N'Eat a banana or light snack 30 minutes before exercising for energy', N'pre_workout', N'all'),
(N'Post-Workout Recovery', N'Have protein within 30 minutes after workout to help muscle recovery', N'post_workout', N'gain_muscle'),
(N'Stay Hydrated', N'Drink water before, during, and after exercise. Aim for 8-10 glasses daily', N'hydration', N'all'),
(N'Weight Loss Tip', N'Create a small calorie deficit by eating slightly less and moving more', N'general', N'lose_weight'),
(N'Muscle Building', N'Eat protein with each meal. Good sources: chicken, fish, eggs, beans', N'general', N'gain_muscle'),
(N'Energy Foods', N'Complex carbs like oats, quinoa, and sweet potatoes provide lasting energy', N'general', N'build_endurance'),
(N'Pre-Workout Hydration', N'Drink 16-20 oz of water 2-3 hours before exercising', N'pre_workout', N'all'),
(N'Recovery Nutrition', N'Chocolate milk is a great post-workout drink with carbs and protein', N'post_workout', N'all');

-- ================================
-- USEFUL INDEXES FOR PERFORMANCE
-- ================================
CREATE NONCLUSTERED INDEX IX_users_email ON users(email);
CREATE NONCLUSTERED INDEX IX_workout_sessions_user_date ON workout_sessions(user_id, session_date);
CREATE NONCLUSTERED INDEX IX_user_progress_user_date ON user_progress(user_id, record_date);
CREATE NONCLUSTERED INDEX IX_routine_exercises_routine ON routine_exercises(routine_id, exercise_order);



SELECT * FROM Users
---- ================================
---- HELPFUL VIEWS
---- ================================

---- View to get complete routine information
--CREATE VIEW routine_details AS
--SELECT 
--    r.routine_id,
--    r.routine_name,
--    r.description,
--    r.difficulty,
--    r.total_duration_minutes,
--    r.target_goal,
--    COUNT(re.exercise_id) as total_exercises
--FROM routines r
--LEFT JOIN routine_exercises re ON r.routine_id = re.routine_id
--WHERE r.is_active = 1
--GROUP BY r.routine_id, r.routine_name, r.description, r.difficulty, r.total_duration_minutes, r.target_goal;
--GO

---- View to get user workout statistics
--CREATE VIEW user_workout_stats AS
--SELECT 
--    u.user_id,
--    u.full_name,
--    COUNT(ws.session_id) as total_workouts,
--    ISNULL(SUM(ws.total_minutes), 0) as total_minutes_exercised,
--    ISNULL(SUM(ws.calories_burned), 0) as total_calories_burned,
--    ISNULL(AVG(CAST(ws.total_minutes AS FLOAT)), 0) as avg_workout_duration,
--    MAX(ws.session_date) as last_workout_date
--FROM users u
--LEFT JOIN workout_sessions ws ON u.user_id = ws.user_id AND ws.completed = 1
--GROUP BY u.user_id, u.full_name;
--GO

---- ================================
---- USEFUL STORED PROCEDURES
---- ================================

---- Get user's workout history
--CREATE PROCEDURE GetUserWorkoutHistory
--    @UserId INT,
--    @Days INT = 30
--AS
--BEGIN
--    SELECT 
--        ws.session_date,
--        r.routine_name,
--        ws.total_minutes,
--        ws.calories_burned,
--        ws.completed
--    FROM workout_sessions ws
--    INNER JOIN routines r ON ws.routine_id = r.routine_id
--    WHERE ws.user_id = @UserId 
--        AND ws.session_date >= DATEADD(day, -@Days, GETDATE())
--    ORDER BY ws.session_date DESC;
--END
--GO

---- Get routine with exercises
--CREATE PROCEDURE GetRoutineDetails
--    @RoutineId INT
--AS
--BEGIN
--    -- Routine info
--    SELECT 
--        routine_name,
--        description,
--        difficulty,
--        total_duration_minutes,
--        target_goal
--    FROM routines 
--    WHERE routine_id = @RoutineId AND is_active = 1;
    
--    -- Exercises in routine
--    SELECT 
--        e.exercise_name,
--        e.description,
--        e.muscle_group,
--        re.exercise_order,
--        re.sets,
--        re.reps,
--        re.duration_seconds,
--        re.rest_seconds
--    FROM routine_exercises re
--    INNER JOIN exercises e ON re.exercise_id = e.exercise_id
--    WHERE re.routine_id = @RoutineId
--    ORDER BY re.exercise_order;
--END
--GO

---- Get nutrition tips for user
--CREATE PROCEDURE GetNutritionTips
--    @Goal NVARCHAR(20) = 'all',
--    @Category NVARCHAR(20) = NULL
--AS
--BEGIN
--    SELECT 
--        tip_title,
--        tip_content,
--        tip_category
--    FROM nutrition_tips
--    WHERE is_active = 1
--        AND (target_goal = @Goal OR target_goal = 'all')
--        AND (@Category IS NULL OR tip_category = @Category)
--    ORDER BY tip_category, tip_title;
--END
--GO