import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import PersonalInfoStep from "./steps/personal-info-step";
import FitnessGoalsStep from "./steps/fitness-goals-step";
import ConfirmationStep from "./steps/confirmation-step";
import { useAuth } from "@/components/auth-provider";
import { useNavigate } from "react-router-dom";
import type { RegisterData } from "@/types/user";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const initialData: RegisterData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  fitnessGoal: "",
  weightKg: 0,
  heightCm: 0,
  experienceLevel: "",
};

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegisterData>(initialData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { handleRegister, isLoading } = useAuth();
  const navigate = useNavigate();

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
    if (error) setError(""); // Limpiar error al escribir
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
    setError("");
    setSuccess("");

    const result = await handleRegister(formData);

    if (result.success) {
      setSuccess("¡Cuenta creada exitosamente! Redirigiendo...");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } else {
      setError(result.error || "Error al crear la cuenta");
    }
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
          formData.weightKg !== 0 &&
          formData.heightCm !== 0 &&
          formData.experienceLevel !== ""
        );
      case 3:
        return true;
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

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
        </Alert>
      )}

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
