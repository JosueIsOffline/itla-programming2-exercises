import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  Clock,
  Target,
  TrendingUp,
  Flame,
  Calendar,
  Award,
  Zap,
  Timer,
  Apple,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import {
  workoutSessionApi,
  progressApi,
  type WorkoutStats,
  type ProgressSummary,
  type WorkoutSession,
} from "@/lib/api-service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats | null>(null);
  const [progressSummary, setProgressSummary] =
    useState<ProgressSummary | null>(null);
  const [recentSessions, setRecentSessions] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [stats, summary, sessions] = await Promise.all([
        workoutSessionApi.getStats(),
        progressApi.getSummary(),
        workoutSessionApi.getAll(),
      ]);

      setWorkoutStats(stats);
      setProgressSummary(summary);
      setRecentSessions(sessions.slice(0, 5)); // Get last 5 sessions
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Error al cargar los datos del dashboard");
    } finally {
      setLoading(false);
    }
  };

  const getGoalBadge = (goal: string) => {
    switch (goal) {
      case "lose_weight":
        return { text: "Perder Peso", color: "bg-red-100 text-red-800" };
      case "gain_muscle":
        return { text: "Ganar Músculo", color: "bg-blue-100 text-blue-800" };
      case "stay_fit":
        return { text: "Mantenerse Fit", color: "bg-green-100 text-green-800" };
      default:
        return { text: "Objetivo", color: "bg-gray-100 text-gray-800" };
    }
  };

  const goalBadge = getGoalBadge(currentUser?.fitnessGoal || "stay_fit");

  const achievements = [
    {
      title: "Primera Semana",
      description: "Completaste tu primera semana",
      icon: Award,
      earned: (workoutStats?.totalWorkouts || 0) >= 3,
    },
    {
      title: "Quema Calorías",
      description: "Quemaste 1000 calorías",
      icon: Flame,
      earned: (workoutStats?.totalCalories || 0) >= 1000,
    },
    {
      title: "Constancia",
      description: "7 días consecutivos",
      icon: Calendar,
      earned: (workoutStats?.currentStreak || 0) >= 7,
    },
    {
      title: "Meta Semanal",
      description: "5 entrenamientos por semana",
      icon: Target,
      earned: (workoutStats?.totalWorkouts || 0) >= 5,
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800/60 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              ¡Bienvenido de vuelta, {currentUser?.fullName}!
            </h1>
            <p className="text-purple-100 mb-4">
              {progressSummary?.currentWeight
                ? `Peso actual: ${progressSummary.currentWeight} kg`
                : "Registra tu progreso para ver tu evolución"}
            </p>
            <div className="flex gap-2 mb-4">
              <Badge className={goalBadge.color}>{goalBadge.text}</Badge>
              <Badge className="bg-white/20 text-white">
                {currentUser?.experienceLevel === "beginner"
                  ? "Principiante"
                  : currentUser?.experienceLevel === "intermediate"
                    ? "Intermedio"
                    : "Avanzado"}
              </Badge>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => navigate("/exercises")}
            >
              <Zap className="mr-2 h-4 w-4" />
              Comenzar Entrenamiento
            </Button>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <div className="text-3xl font-bold">
                {workoutStats?.totalWorkouts || 0}
              </div>
              <div className="text-purple-200">Entrenamientos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Entrenamientos Totales
            </CardTitle>
            <Activity className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {workoutStats?.totalWorkouts || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Tiempo total: {Math.floor((workoutStats?.totalMinutes || 0) / 60)}
              h {(workoutStats?.totalMinutes || 0) % 60}min
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Calorías Quemadas
            </CardTitle>
            <Flame className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {workoutStats?.totalCalories || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Promedio por sesión:{" "}
              {workoutStats?.totalWorkouts
                ? Math.round(
                    (workoutStats.totalCalories || 0) /
                      workoutStats.totalWorkouts,
                  )
                : 0}{" "}
              kcal
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Racha Actual
            </CardTitle>
            <Calendar className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {workoutStats?.currentStreak || 0}
            </div>
            <p className="text-sm text-green-600 font-medium mt-1">
              {(workoutStats?.currentStreak || 0) > 0
                ? "¡Excelente!"
                : "¡Comienza tu racha!"}
            </p>
            <p className="text-xs text-gray-500">días consecutivos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Progreso de Peso
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {progressSummary?.weightChange
                ? `${progressSummary.weightChange > 0 ? "+" : ""}${progressSummary.weightChange.toFixed(1)}`
                : "0.0"}
            </div>
            <p className="text-sm text-purple-600 font-medium mt-1">
              kg de cambio
            </p>
            <p className="text-xs text-gray-500">desde el inicio</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>Tus últimos entrenamientos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSessions.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No hay entrenamientos registrados
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    ¡Comienza tu primer entrenamiento!
                  </p>
                  <Button onClick={() => navigate("/exercises")}>
                    Ver Ejercicios
                  </Button>
                </div>
              ) : (
                recentSessions.map((session, index) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatDate(session.sessionDate)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {session.durationMinutes} min
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {session.exerciseName || "Ejercicio"}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {session.caloriesBurned} kcal quemadas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.completed ? (
                        <Badge className="bg-green-100 text-green-800">
                          Completado
                        </Badge>
                      ) : (
                        <Badge variant="outline">En progreso</Badge>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Accesos directos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-between"
              variant="outline"
              onClick={() => navigate("/exercises")}
            >
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Ver Ejercicios
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              className="w-full justify-between"
              variant="outline"
              onClick={() => navigate("/timer")}
            >
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                Cronómetro
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              className="w-full justify-between"
              variant="outline"
              onClick={() => navigate("/progress")}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Mi Progreso
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              className="w-full justify-between"
              variant="outline"
              onClick={() => navigate("/nutrition")}
            >
              <div className="flex items-center gap-2">
                <Apple className="h-4 w-4" />
                Consejos Nutrición
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Logros y Insignias
          </CardTitle>
          <CardDescription>Tu progreso y reconocimientos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.earned
                    ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"
                    : "border-gray-200 bg-gray-50 opacity-60 dark:border-gray-700 dark:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      achievement.earned
                        ? "bg-yellow-100 dark:bg-yellow-900"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    <achievement.icon
                      className={`h-5 w-5 ${
                        achievement.earned
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      {progressSummary && progressSummary.totalEntries > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Resumen de Progreso
            </CardTitle>
            <CardDescription>Tu evolución reciente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">
                  {progressSummary.currentWeight?.toFixed(1) || "N/A"} kg
                </div>
                <p className="text-sm text-muted-foreground">Peso Actual</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">
                  {progressSummary.weightChange ? (
                    <>
                      {progressSummary.weightChange > 0 ? "+" : ""}
                      {progressSummary.weightChange.toFixed(1)} kg
                    </>
                  ) : (
                    "N/A"
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Cambio Total</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">
                  {progressSummary.totalEntries}
                </div>
                <p className="text-sm text-muted-foreground">Registros</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
