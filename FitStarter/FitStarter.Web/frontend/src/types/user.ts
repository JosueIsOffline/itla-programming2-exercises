export type User = {
  id: number;
  fullName: string;
  email: string;
  weightKg: number;
  heightCm: number;
  fitnessGoal: "stay_fit" | "gain_muscle" | "lose_weight";
  experienceLevel: "beginner" | "intermediate" | "advanced";
};

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  weightKg: number;
  heightCm: number;
  fitnessGoal: string;
  experienceLevel: string;
}
