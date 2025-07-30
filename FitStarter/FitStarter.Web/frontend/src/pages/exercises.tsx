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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity, Clock, Flame, Search, Filter, Loader2 } from "lucide-react";
import {
  exerciseApi,
  workoutSessionApi,
  type Exercise,
} from "@/lib/api-service";
import { toast } from "sonner";

export default function ExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [submittingExercise, setSubmittingExercise] = useState<number | null>(
    null,
  );

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [exercises, searchTerm, filterType]);

  const loadExercises = async () => {
    try {
      setLoading(true);
      const data = await exerciseApi.getAll();
      setExercises(data);
    } catch (error) {
      console.error("Error loading exercises:", error);
      toast.error("Error al cargar los ejercicios");
    } finally {
      setLoading(false);
    }
  };

  const filterExercises = () => {
    let filtered = exercises;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter(
        (exercise) => exercise.exerciseType === filterType,
      );
    }

    setFilteredExercises(filtered);
  };

  const handleWorkoutComplete = async (exercise: Exercise) => {
    try {
      setSubmittingExercise(exercise.id);
      const calories = exercise.caloriesPerMinute * exercise.durationMinutes;

      await workoutSessionApi.create({
        exerciseId: exercise.id,
        durationMinutes: exercise.durationMinutes,
        caloriesBurned: calories,
        completed: true,
        notes: `Completado: ${exercise.name}`,
      });

      toast.success(`¡Ejercicio ${exercise.name} completado! 🎉`);
    } catch (error) {
      console.error("Error completing workout:", error);
      toast.error("Error al registrar el ejercicio");
    } finally {
      setSubmittingExercise(null);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cardio":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "strength":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "flexibility":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "cardio":
        return "Cardio";
      case "strength":
        return "Fuerza";
      case "flexibility":
        return "Flexibilidad";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando ejercicios...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Biblioteca de Ejercicios
          </CardTitle>
          <CardDescription>
            Explora nuestra colección de ejercicios para alcanzar tus objetivos
            fitness
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
                      {getTypeIcon(exercise.exerciseType)}
                    </span>
                    {exercise.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {exercise.muscleGroup}
                  </CardDescription>
                </div>
                <Badge className={getTypeColor(exercise.exerciseType)}>
                  {getTypeLabel(exercise.exerciseType)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{exercise.durationMinutes} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span>
                      {exercise.caloriesPerMinute * exercise.durationMinutes}{" "}
                      kcal
                    </span>
                  </div>
                </div>

                {exercise.description && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {exercise.description}
                    </p>
                  </div>
                )}

                {exercise.instructions && (
                  <div className="text-xs text-muted-foreground">
                    <strong>Instrucciones:</strong> {exercise.instructions}
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={() => handleWorkoutComplete(exercise)}
                  disabled={submittingExercise === exercise.id}
                >
                  {submittingExercise === exercise.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Registrando...
                    </>
                  ) : (
                    "Completar Ejercicio"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && !loading && (
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
