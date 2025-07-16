import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Scale, Ruler, Activity, Award } from "lucide-react";

import type { RegisterData } from "@/types/user";

interface FitnessGoalsStepProps {
  formData: RegisterData;
  updateFormData: (field: keyof RegisterData, value: string | boolean) => void;
}

export default function FitnessGoalsStep({
  formData,
  updateFormData,
}: FitnessGoalsStepProps) {
  const fitnessGoals = [
    {
      value: "lose_weight",
      label: "Perder peso",
      icon: "🎯",
      description: "Reducir grasa corporal",
    },
    {
      value: "gain_muscle",
      label: "Ganar músculo",
      icon: "💪",
      description: "Aumentar masa muscular",
    },
    {
      value: "stay_fit",
      label: "Mantenerse fit",
      icon: "⚡",
      description: "Mantener forma física",
    },
  ];

  const activityLevels = [
    {
      value: "sedentary",
      label: "Sedentario",
      description: "Poco o nada de ejercicio",
    },
    {
      value: "light",
      label: "Ligero",
      description: "Ejercicio ligero 1-3 días/semana",
    },
    {
      value: "moderate",
      label: "Moderado",
      description: "Ejercicio moderado 3-5 días/semana",
    },
    {
      value: "active",
      label: "Activo",
      description: "Ejercicio intenso 6-7 días/semana",
    },
  ];

  const experienceLevels = [
    {
      value: "beginner",
      label: "Principiante",
      description: "Nuevo en el fitness",
    },
    {
      value: "intermediate",
      label: "Intermedio",
      description: "Algo de experiencia",
    },
    { value: "advanced", label: "Avanzado", description: "Mucha experiencia" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Target className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Objetivos Fitness
        </h3>
        <p className="text-sm text-gray-600">
          Ayúdanos a personalizar tu experiencia
        </p>
      </div>

      <div className="space-y-6">
        {/* Objetivo Fitness */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            ¿Cuál es tu objetivo principal? *
          </Label>
          <div className="grid gap-3">
            {fitnessGoals.map((goal) => (
              <Card
                key={goal.value}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  formData.fitnessGoal === goal.value
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => updateFormData("fitnessGoal", goal.value)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{goal.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {goal.label}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {goal.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Datos Físicos */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="currentWeight">Peso actual (kg) *</Label>
            <div className="relative">
              <Scale className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="currentWeight"
                type="number"
                step="0.1"
                placeholder="70.0"
                value={formData.weightKg}
                onChange={(e) => updateFormData("weightKg", e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* <div className="space-y-2"> */}
          {/*   <Label htmlFor="targetWeight">Peso objetivo (kg)</Label> */}
          {/*   <div className="relative"> */}
          {/*     <Target className="absolute left-3 top-3 h-4 w-4 text-gray-400" /> */}
          {/*     <Input */}
          {/*       id="targetWeight" */}
          {/*       type="number" */}
          {/*       step="0.1" */}
          {/*       placeholder="65.0" */}
          {/*       value={formData.targetWeight} */}
          {/*       onChange={(e) => updateFormData("targetWeight", e.target.value)} */}
          {/*       className="pl-10" */}
          {/*     /> */}
          {/*   </div> */}
          {/* </div> */}

          <div className="space-y-2">
            <Label htmlFor="height">Altura (cm) *</Label>
            <div className="relative">
              <Ruler className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={formData.heightCm}
                onChange={(e) => updateFormData("heightCm", e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        {/* Nivel de Actividad */}

        {/* <div className="space-y-2"> */}
        {/*   <Label>Nivel de actividad actual *</Label> */}
        {/*   <Select */}
        {/*     value={formData.activityLevel} */}
        {/*     onValueChange={(value) => updateFormData("activityLevel", value)} */}
        {/*   > */}
        {/*     <SelectTrigger> */}
        {/*       <Activity className="h-4 w-4 mr-2" /> */}
        {/*       <SelectValue placeholder="Selecciona tu nivel de actividad" /> */}
        {/*     </SelectTrigger> */}
        {/*     <SelectContent> */}
        {/*       {activityLevels.map((level) => ( */}
        {/*         <SelectItem key={level.value} value={level.value}> */}
        {/*           <div> */}
        {/*             <div className="font-medium">{level.label}</div> */}
        {/*             <div className="text-xs text-gray-600"> */}
        {/*               {level.description} */}
        {/*             </div> */}
        {/*           </div> */}
        {/*         </SelectItem> */}
        {/*       ))} */}
        {/*     </SelectContent> */}
        {/*   </Select> */}
        {/* </div> */}

        {/* Experiencia */}
        <div className="space-y-2">
          <Label>Experiencia en fitness *</Label>
          <Select
            value={formData.experienceLevel}
            onValueChange={(value) => updateFormData("experienceLevel", value)}
          >
            <SelectTrigger>
              <Award className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Selecciona tu nivel de experiencia" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  <div>
                    <div className="font-medium">{level.label}</div>
                    <div className="text-xs text-gray-600">
                      {level.description}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-green-900 mb-2">
          Personalización inteligente
        </h4>
        <p className="text-xs text-green-800">
          Usaremos esta información para crear rutinas personalizadas y
          recomendaciones específicas para ti.
        </p>
      </div>
    </div>
  );
}
