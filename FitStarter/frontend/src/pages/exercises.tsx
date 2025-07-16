import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity, Clock, Flame, Search, Filter } from "lucide-react";

export default function ExerciseList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [todayWorkouts, setTodayWorkouts] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const exercises = [
    {
      id: 1,
      name: "Flexiones",
      muscleGroup: "Pecho",
      type: "strength",
      duration: 10,
      caloriesPerMinute: 8,
    },
    {
      id: 2,
      name: "Sentadillas",
      muscleGroup: "Piernas",
      type: "strength",
      duration: 10,
      caloriesPerMinute: 6,
    },
    {
      id: 3,
      name: "Plancha",
      muscleGroup: "Core",
      type: "strength",
      duration: 5,
      caloriesPerMinute: 5,
    },
    {
      id: 4,
      name: "Jumping Jacks",
      muscleGroup: "Todo el cuerpo",
      type: "cardio",
      duration: 10,
      caloriesPerMinute: 10,
    },
    {
      id: 5,
      name: "Burpees",
      muscleGroup: "Todo el cuerpo",
      type: "cardio",
      duration: 10,
      caloriesPerMinute: 12,
    },
    {
      id: 6,
      name: "Estiramiento",
      muscleGroup: "Todo el cuerpo",
      type: "flexibility",
      duration: 15,
      caloriesPerMinute: 2,
    },
  ];
  const handleWorkoutComplete = (exercise: any, duration: number) => {
    const calories = exercise.caloriesPerMinute * duration;
    setTodayWorkouts((prev) => prev + 1);
    setTotalCalories((prev) => prev + calories);
  };

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || exercise.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cardio":
        return "bg-red-100 text-red-800";
      case "strength":
        return "bg-blue-100 text-blue-800";
      case "flexibility":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "cardio":
        return "❤️";
      case "strength":
        return "💪";
      case "flexibility":
        return "🧘";
      default:
        return "🏃";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Biblioteca de Ejercicios
          </CardTitle>
          <CardDescription>
            Explora nuestra colección de ejercicios básicos para principiantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar ejercicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="strength">Fuerza</SelectItem>
                <SelectItem value="flexibility">Flexibilidad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-2xl">
                      {getTypeIcon(exercise.type)}
                    </span>
                    {exercise.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {exercise.muscleGroup}
                  </CardDescription>
                </div>
                <Badge className={getTypeColor(exercise.type)}>
                  {exercise.type === "cardio"
                    ? "Cardio"
                    : exercise.type === "strength"
                      ? "Fuerza"
                      : "Flexibilidad"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{exercise.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span>
                      {exercise.caloriesPerMinute * exercise.duration} kcal
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Quema aproximadamente{" "}
                    <strong>{exercise.caloriesPerMinute} kcal/min</strong>
                  </p>
                </div>

                <Button
                  className="w-full"
                  onClick={() =>
                    handleWorkoutComplete(exercise, exercise.duration)
                  }
                >
                  Completar Ejercicio
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No se encontraron ejercicios
            </h3>
            <p className="text-muted-foreground">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
