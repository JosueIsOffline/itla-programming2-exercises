"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PersonalInfoStep from "./steps/personal-info-step";
import FitnessGoalsStep from "./steps/fitness-goals-step";
import ConfirmationStep from "./steps/confirmation-step";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export interface RegisterData {
  // Paso 1: Información personal
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;

  // Paso 2: Objetivos fitness
  fitnessGoal: string;
  currentWeight: string;
  targetWeight: string;
  height: string;
  activityLevel: string;
  experience: string;

  // Paso 3: Confirmación
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

const initialData: RegisterData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  fitnessGoal: "",
  currentWeight: "",
  targetWeight: "",
  height: "",
  activityLevel: "",
  experience: "",
  acceptTerms: false,
  acceptMarketing: false,
};

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegisterData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    "Información Personal",
    "Objetivos Fitness",
    "Confirmación",
  ];

  const updateFormData = (
    field: keyof RegisterData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simular registro
    setTimeout(() => {
      setIsLoading(false);
      console.log("Datos de registro:", formData);
      // Aquí iría la lógica de registro real
      onSwitchToLogin();
    }, 2000);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.password.length >= 6 &&
          formData.password === formData.confirmPassword
        );
      case 2:
        return (
          formData.fitnessGoal !== "" &&
          formData.currentWeight !== "" &&
          formData.height !== "" &&
          formData.activityLevel !== "" &&
          formData.experience !== ""
        );
      case 3:
        return formData.acceptTerms;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <FitnessGoalsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <ConfirmationStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Crear tu cuenta</h2>
        <p className="text-gray-600">
          Completa los siguientes pasos para comenzar
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Paso {currentStep} de {totalSteps}
          </span>
          <span>{Math.round(progress)}% completado</span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-sm font-medium text-gray-900 text-center">
          {stepTitles[currentStep - 1]}
        </p>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">{renderStep()}</div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2 bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>

        {currentStep < totalSteps ? (
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex items-center gap-2"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!isStepValid() || isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
          </Button>
        )}
      </div>

      {/* Login Link */}
      <div className="text-center text-sm pt-4 border-t">
        <span className="text-gray-600">¿Ya tienes una cuenta? </span>
        <Button
          variant="link"
          className="px-0 text-blue-600 hover:text-blue-700"
          onClick={onSwitchToLogin}
        >
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
}
