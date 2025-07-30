import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { Activity, Dumbbell, Target, TrendingUp } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Navigate, useLocation } from "react-router-dom";

export function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Activity className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">FitStarter</h1>
                <p className="text-gray-600">
                  Tu entrenador virtual profesional
                </p>
              </div>
            </div>

            <div className="space-y-6 mt-12">
              <h2 className="text-2xl font-bold text-gray-900">
                Transforma tu vida con entrenamientos personalizados
              </h2>
              <p className="text-lg text-gray-600">
                Únete a miles de usuarios que ya han alcanzado sus objetivos
                fitness con nuestra plataforma.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-6">
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Dumbbell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Ejercicios Personalizados
                </h3>
                <p className="text-sm text-gray-600">
                  Rutinas adaptadas a tu nivel y objetivos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Seguimiento de Progreso
                </h3>
                <p className="text-sm text-gray-600">
                  Monitorea tu evolución día a día
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Análisis Detallado
                </h3>
                <p className="text-sm text-gray-600">
                  Estadísticas y métricas de rendimiento
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardContent className="p-0">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 rounded-none rounded-t-lg h-12">
                  <TabsTrigger value="login" className="text-sm font-medium">
                    Iniciar Sesión
                  </TabsTrigger>
                  <TabsTrigger value="register" className="text-sm font-medium">
                    Crear Cuenta
                  </TabsTrigger>
                </TabsList>

                <div className="p-6">
                  <TabsContent value="login" className="mt-0">
                    <LoginForm
                      onSwitchToRegister={() => setActiveTab("register")}
                    />
                  </TabsContent>

                  <TabsContent value="register" className="mt-0">
                    <RegisterForm
                      onSwitchToLogin={() => setActiveTab("login")}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Mobile Branding */}
          <div className="lg:hidden text-center mt-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                FitStarter
              </span>
            </div>
            <p className="text-gray-600">Tu entrenador virtual profesional</p>
          </div>
        </div>
      </div>
    </div>
  );
}
