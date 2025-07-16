import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";

// interface DashboardProps {
//   userData: {
//     fullName: string;
//     fitnessGoal: string;
//     currentWeight: number;
//     targetWeight?: number;
//   };
//   todayWorkouts: number;
//   totalCalories: number;
// }

export default function Dashboard() {
  const { currentUser } = useAuth();

  const weeklyGoal = 5;
  // const weeklyProgress = (todayWorkouts / weeklyGoal) * 100;
  const calorieGoal = 300;
  // const calorieProgress = (totalCalories / calorieGoal) * 100;
  const userData = currentUser;

  const achievements = [
    {
      title: "Primera Semana",
      description: "Completaste tu primera semana",
      icon: Award,
      earned: true,
    },
    {
      title: "Quema Calorías",
      description: "Quemaste 1000 calorías",
      icon: Flame,
      earned: true,
    },
    {
      title: "Constancia",
      description: "7 días consecutivos",
      icon: Calendar,
      earned: false,
    },
    {
      title: "Meta Semanal",
      description: "5 entrenamientos por semana",
      icon: Target,
      earned: false,
    },
  ];

  const todaySchedule = [
    {
      time: "07:00",
      activity: "Cardio matutino",
      duration: "20 min",
      completed: true,
    },
    {
      time: "12:00",
      activity: "Ejercicios de fuerza",
      duration: "30 min",
      completed: false,
    },
    {
      time: "18:00",
      activity: "Estiramiento",
      duration: "15 min",
      completed: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}

      <div className="bg-gradient-to-r from-purple-600 to-purple-800/60 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              ¡Bienvenido de vuelta, {userData?.fullName}!
            </h1>
            <p className="text-blue-100 mb-4">
              Estás a solo{" "}
              {/* {Math.abs(userData.currentWeight - userData.targetWeight).toFixed( */}
              {/*   1, */}
              {/* )}{" "} */}
              kg de tu meta
            </p>
            <Button
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Zap className="mr-2 h-4 w-4" />
              Comenzar Entrenamiento
            </Button>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <div className="text-3xl font-bold">
                {/* {userData.currentWeight} kg */}
              </div>
              <div className="text-blue-200">Peso actual</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Entrenamientos Hoy
            </CardTitle>
            <Activity className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-3xl font-bold">{todayWorkouts}</div> */}
            <div className="flex items-center mt-2">
              {/* <Progress value={weeklyProgress} className="flex-1 mr-2" /> */}
              {/* <span className="text-sm ">{Math.round(weeklyProgress)}%</span> */}
            </div>
            <p className="text-xs  mt-1">Meta semanal: {weeklyGoal}</p>
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
            {/* <div className="text-3xl font-bold">{totalCalories}</div> */}
            <div className="flex items-center mt-2">
              {/* <Progress value={calorieProgress} className="flex-1 mr-2" /> */}
              {/* <span className="text-sm ">{Math.round(calorieProgress)}%</span> */}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Meta diaria: {calorieGoal} kcal
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
            <div className="text-3xl font-bold">4</div>
            <p className="text-sm text-green-600 font-medium mt-1">
              ¡Excelente!
            </p>
            <p className="text-xs text-gray-500">días consecutivos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tiempo Total
            </CardTitle>
            <Clock className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.5</div>
            <p className="text-sm text-purple-600 font-medium mt-1">
              horas esta semana
            </p>
            <p className="text-xs text-gray-500">+30 min vs semana pasada</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Agenda de Hoy
            </CardTitle>
            <CardDescription>Tu plan de entrenamiento para hoy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-900">
                        {item.time}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.duration}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {item.activity}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Duración: {item.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.completed ? (
                      <Badge className="bg-green-100 text-green-800">
                        Completado
                      </Badge>
                    ) : (
                      <Button size="sm" variant="outline">
                        <Timer className="mr-2 h-4 w-4" />
                        Iniciar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
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
            <Button className="w-full justify-between" variant="outline">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Ver Ejercicios
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button className="w-full justify-between" variant="outline">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                Cronómetro
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button className="w-full justify-between" variant="outline">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Mi Progreso
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button className="w-full justify-between" variant="outline">
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
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${achievement.earned ? "bg-yellow-100" : "bg-gray-100"}`}
                  >
                    <achievement.icon
                      className={`h-5 w-5 ${achievement.earned ? "text-yellow-600" : "text-gray-400"}`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
