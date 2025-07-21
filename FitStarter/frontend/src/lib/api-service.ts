import api from "./axios";

// Exercise related types
export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  exerciseType: "cardio" | "strength" | "flexibility";
  durationMinutes: number;
  caloriesPerMinute: number;
  description: string;
  instructions: string;
  equipmentNeeded: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isActive: boolean;
  createdAt: string;
}

export interface WorkoutSession {
  id: number;
  userId: number;
  exerciseId: number;
  sessionDate: string;
  durationMinutes: number;
  caloriesBurned: number;
  completed: boolean;
  notes: string;
  createdAt: string;
  exerciseName?: string;
  userName?: string;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalMinutes: number;
  totalCalories: number;
  currentStreak: number;
  lastWorkoutDate?: string;
}

export interface UserProgress {
  id: number;
  userId: number;
  recordDate: string;
  weightKg?: number;
  bodyFatPercent?: number;
  notes: string;
  createdAt: string;
}

export interface ProgressSummary {
  currentWeight?: number;
  startingWeight?: number;
  weightChange?: number;
  totalEntries: number;
  lastRecordDate?: string;
  recentEntries: UserProgress[];
}

export interface NutritionTip {
  id: number;
  title: string;
  content: string;
  category: "pre_workout" | "post_workout" | "general" | "hydration";
  targetGoal:
    | "lose_weight"
    | "gain_muscle"
    | "stay_fit"
    | "build_endurance"
    | "all";
  isActive: boolean;
  createdAt: string;
}

// Exercise API
export const exerciseApi = {
  getAll: async (type?: string, muscleGroup?: string): Promise<Exercise[]> => {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (muscleGroup) params.append("muscleGroup", muscleGroup);

    const response = await api.get(`/exercises?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Exercise> => {
    const response = await api.get(`/exercises/${id}`);
    return response.data;
  },

  create: async (
    exercise: Omit<Exercise, "id" | "isActive" | "createdAt">,
  ): Promise<Exercise> => {
    const response = await api.post("/exercises", exercise);
    return response.data;
  },

  update: async (
    id: number,
    exercise: Partial<Exercise>,
  ): Promise<Exercise> => {
    const response = await api.put(`/exercises/${id}`, exercise);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/exercises/${id}`);
  },
};

// Workout Session API
export const workoutSessionApi = {
  getAll: async (
    startDate?: Date,
    endDate?: Date,
  ): Promise<WorkoutSession[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate.toISOString());
    if (endDate) params.append("endDate", endDate.toISOString());

    const response = await api.get(`/workout-sessions?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<WorkoutSession> => {
    const response = await api.get(`/workout-sessions/${id}`);
    return response.data;
  },

  create: async (session: {
    exerciseId: number;
    sessionDate?: Date;
    durationMinutes: number;
    caloriesBurned: number;
    completed: boolean;
    notes?: string;
  }): Promise<WorkoutSession> => {
    const response = await api.post("/workout-sessions", {
      ...session,
      sessionDate:
        session.sessionDate?.toISOString() || new Date().toISOString(),
    });
    return response.data;
  },

  update: async (
    id: number,
    session: {
      durationMinutes?: number;
      caloriesBurned?: number;
      completed?: boolean;
      notes?: string;
    },
  ): Promise<WorkoutSession> => {
    const response = await api.put(`/workout-sessions/${id}`, session);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/workout-sessions/${id}`);
  },

  getStats: async (startDate?: Date, endDate?: Date): Promise<WorkoutStats> => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate.toISOString());
    if (endDate) params.append("endDate", endDate.toISOString());

    const response = await api.get(
      `/workout-sessions/stats?${params.toString()}`,
    );
    return response.data;
  },
};

// User Progress API
export const progressApi = {
  getAll: async (startDate?: Date, endDate?: Date): Promise<UserProgress[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate.toISOString());
    if (endDate) params.append("endDate", endDate.toISOString());

    const response = await api.get(`/progress?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<UserProgress> => {
    const response = await api.get(`/progress/${id}`);
    return response.data;
  },

  create: async (progress: {
    recordDate?: Date;
    weightKg?: number;
    bodyFatPercent?: number;
    notes?: string;
  }): Promise<UserProgress> => {
    const response = await api.post("/progress", {
      ...progress,
      recordDate:
        progress.recordDate?.toISOString() || new Date().toISOString(),
    });
    return response.data;
  },

  update: async (
    id: number,
    progress: {
      weightKg?: number;
      bodyFatPercent?: number;
      notes?: string;
    },
  ): Promise<UserProgress> => {
    const response = await api.put(`/progress/${id}`, progress);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/progress/${id}`);
  },

  getSummary: async (): Promise<ProgressSummary> => {
    const response = await api.get("/progress/summary");
    return response.data;
  },
};

// Nutrition Tips API
export const nutritionApi = {
  getAll: async (
    category?: string,
    targetGoal?: string,
  ): Promise<NutritionTip[]> => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (targetGoal) params.append("targetGoal", targetGoal);

    const response = await api.get(`/nutrition-tips?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<NutritionTip> => {
    const response = await api.get(`/nutrition-tips/${id}`);
    return response.data;
  },

  create: async (tip: {
    title: string;
    content: string;
    category: string;
    targetGoal: string;
  }): Promise<NutritionTip> => {
    const response = await api.post("/nutrition-tips", tip);
    return response.data;
  },

  update: async (
    id: number,
    tip: Partial<NutritionTip>,
  ): Promise<NutritionTip> => {
    const response = await api.put(`/nutrition-tips/${id}`, tip);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/nutrition-tips/${id}`);
  },

  getCategories: async (): Promise<{ value: string; label: string }[]> => {
    const response = await api.get("/nutrition-tips/categories");
    return response.data;
  },

  getTargetGoals: async (): Promise<{ value: string; label: string }[]> => {
    const response = await api.get("/nutrition-tips/target-goals");
    return response.data;
  },
};

export default {
  exerciseApi,
  workoutSessionApi,
  progressApi,
  nutritionApi,
};
