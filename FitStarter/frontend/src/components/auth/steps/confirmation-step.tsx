import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, User, Target } from "lucide-react";

import type { RegisterData } from "@/types/user";

interface ConfirmationStepProps {
  formData: RegisterData;
  updateFormData: (field: keyof RegisterData, value: string | boolean) => void;
}

export default function ConfirmationStep({
  formData,
  updateFormData,
}: ConfirmationStepProps) {
  const getGoalLabel = (goal: string) => {
    switch (goal) {
      case "lose_weight":
        return "Perder peso";
      case "gain_muscle":
        return "Ganar músculo";
      case "stay_fit":
        return "Mantenerse fit";
      default:
        return goal;
    }
  };

  const getActivityLabel = (level: string) => {
    switch (level) {
      case "sedentary":
        return "Sedentario";
      case "light":
        return "Ligero";
      case "moderate":
        return "Moderado";
      case "active":
        return "Activo";
      default:
        return level;
    }
  };

  const getExperienceLabel = (exp: string) => {
    switch (exp) {
      case "beginner":
        return "Principiante";
      case "intermediate":
        return "Intermedio";
      case "advanced":
        return "Avanzado";
      default:
        return exp;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-6 w-6 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Confirmación</h3>
        <p className="text-sm text-gray-600">
          Revisa tu información antes de crear la cuenta
        </p>
      </div>

      {/* Resumen de datos */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Información Personal
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Nombre:</span>
                <span className="font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{formData.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Objetivos Fitness
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Objetivo:</span>
                <span className="font-medium">
                  {getGoalLabel(formData.fitnessGoal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Peso actual:</span>

                <span className="font-medium">{formData.weightKg} kg</span>
              </div>
              {/* {formData.targetWeight && ( */}
              {/*   <div className="flex justify-between"> */}
              {/*     <span className="text-gray-600">Peso objetivo:</span> */}
              {/*     <span className="font-medium"> */}
              {/*       {formData.targetWeight} kg */}
              {/*     </span> */}
              {/*   </div> */}
              {/* )} */}
              <div className="flex justify-between">
                <span className="text-gray-600">Altura:</span>
                <span className="font-medium">{formData.heightCm} cm</span>
              </div>
              {/* <div className="flex justify-between"> */}
              {/*   <span className="text-gray-600">Actividad:</span> */}
              {/*   <span className="font-medium"> */}
              {/*     {getActivityLabel(formData.activityLevel)} */}
              {/*   </span> */}
              {/* </div> */}
              <div className="flex justify-between">
                <span className="text-gray-600">Experiencia:</span>
                <span className="font-medium">
                  {getExperienceLabel(formData.experienceLevel)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Términos y condiciones */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            // checked={formData.acceptTerms}
            // onCheckedChange={(checked) =>
            //   updateFormData("acceptTerms", checked as boolean)
            // }

            className="mt-1"
          />
          <div className="space-y-1">
            <Label
              htmlFor="terms"
              className="text-sm font-medium cursor-pointer"
            >
              Acepto los términos y condiciones *
            </Label>
            <p className="text-xs text-gray-600">
              Al crear una cuenta, aceptas nuestros{" "}
              <a href="#" className="text-blue-600 hover:underline">
                términos de servicio
              </a>{" "}
              y{" "}
              <a href="#" className="text-blue-600 hover:underline">
                política de privacidad
              </a>
              .
            </p>
          </div>
        </div>

        {/* <div className="flex items-start space-x-3"> */}
        {/*   <Checkbox */}
        {/*     id="marketing" */}
        {/*     checked={formData.acceptMarketing} */}
        {/*     onCheckedChange={(checked) => */}
        {/*       updateFormData("acceptMarketing", checked as boolean) */}
        {/*     } */}
        {/*     className="mt-1" */}
        {/*   /> */}
        {/*   <div className="space-y-1"> */}
        {/*     <Label */}
        {/*       htmlFor="marketing" */}
        {/*       className="text-sm font-medium cursor-pointer" */}
        {/*     > */}
        {/*       Recibir consejos y actualizaciones por email */}
        {/*     </Label> */}
        {/*     <p className="text-xs text-gray-600"> */}
        {/*       Te enviaremos consejos de fitness, actualizaciones de la app y */}
        {/*       ofertas especiales. */}
        {/*     </p> */}
        {/*   </div> */}
        {/* </div> */}
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-purple-900 mb-2">
          🎉 ¡Ya casi terminamos!
        </h4>
        <p className="text-xs text-purple-800">
          Tu cuenta será creada con un plan personalizado basado en la
          información proporcionada.
        </p>
      </div>
    </div>
  );
}
