export type User = {
  Id: number;
  FullName: string;
  Email: string;
  WeightKg: number;
  HeightCm: number;
  FitnessGoal: "stay_fit" | "gain_muscle" | "lose_weight";
  ExperienceLevel: "beginner" | "intermediate" | "advanced";
};

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  fitnessGoal: string;
  currentWeight: string;
  targetWeight: string;
  height: string;
  activityLevel: string;
  experience: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}
