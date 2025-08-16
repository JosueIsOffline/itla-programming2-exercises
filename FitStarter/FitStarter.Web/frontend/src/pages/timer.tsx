import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Timer,
  Play,
  Pause,
  Square,
  RotateCcw,
  Flame,
  Loader2,
} from "lucide-react";
import {
  exerciseApi,
  workoutSessionApi,
  type Exercise,
} from "@/lib/api-service";
import { toast } from "sonner";

export default function WorkoutTimer() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            handleWorkoutComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

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

  const handleWorkoutComplete = async () => {
    if (!selectedExercise || completing) return;

    try {
      setCompleting(true);
      const actualDuration = Math.floor((totalTime - timeLeft) / 60);
      const calories = Math.round(
        selectedExercise.caloriesPerMinute *
          (actualDuration || selectedExercise.durationMinutes),
      );

      await workoutSessionApi.create({
        exerciseId: selectedExercise.id,
        durationMinutes: actualDuration || selectedExercise.durationMinutes,
        caloriesBurned: calories,
        completed: true,
        notes: `Completado con cronómetro: ${selectedExercise.name}`,
      });

      toast.success(`¡Ejercicio ${selectedExercise.name} completado! 🎉`);
    } catch (error) {
      console.error("Error completing workout:", error);
      toast.error("Error al registrar el ejercicio");
    } finally {
      setCompleting(false);
    }
  };

  const startTimer = () => {
    if (selectedExercise && !isRunning) {
      if (!isPaused) {
        const duration = selectedExercise.durationMinutes * 60; // Convert to seconds
        setTimeLeft(duration);
        setTotalTime(duration);
      }
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    setTotalTime(0);
  };

  const resetTimer = () => {
    if (selectedExercise) {
      const duration = selectedExercise.durationMinutes * 60;
      setTimeLeft(duration);
      setTotalTime(duration);
      setIsRunning(false);
      setIsPaused(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    if (totalTime === 0) return 0;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getCurrentCalories = () => {
    if (!selectedExercise || totalTime === 0) return 0;
    const elapsedMinutes = (totalTime - timeLeft) / 60;
    return Math.round(selectedExercise.caloriesPerMinute * elapsedMinutes);
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
            <Timer className="h-5 w-5" />
            Cronómetro de Entrenamiento
          </CardTitle>
          <CardDescription>
            Selecciona un ejercicio y usa el cronómetro para seguir tu
            entrenamiento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Exercise Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Seleccionar Ejercicio
              </label>
              <Select
                value={selectedExercise?.id.toString() || ""}
                onValueChange={(value) => {
                  const exercise = exercises.find(
                    (e) => e.id.toString() === value,
                  );
                  setSelectedExercise(exercise || null);
                  stopTimer();
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Elige un ejercicio..." />
                </SelectTrigger>
                <SelectContent>
                  {exercises.map((exercise) => (
                    <SelectItem
                      key={exercise.id}
                      value={exercise.id.toString()}
                    >
                      <div className="flex items-center gap-2">
                        <span>{exercise.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {exercise.durationMinutes}min
                        </Badge>
                        <Badge
                          className={getTypeColor(exercise.exerciseType)}
                          variant="outline"
                        >
                          {getTypeLabel(exercise.exerciseType)}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedExercise && (
              <div className="space-y-6">
                {/* Exercise Info */}
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-semibold">
                        {selectedExercise.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedExercise.muscleGroup}
                      </p>
                      <div className="flex justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Timer className="h-4 w-4" />
                          <span>{selectedExercise.durationMinutes} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span>
                            {selectedExercise.caloriesPerMinute *
                              selectedExercise.durationMinutes}{" "}
                            kcal estimadas
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={getTypeColor(selectedExercise.exerciseType)}
                      >
                        {getTypeLabel(selectedExercise.exerciseType)}
                      </Badge>
                    </div>
                    {selectedExercise.description && (
                      <div className="mt-4 p-3 bg-background rounded-lg">
                        <p className="text-sm text-center">
                          {selectedExercise.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Timer Display */}
                <div className="text-center space-y-4">
                  <div className="text-6xl font-mono font-bold text-primary">
                    {formatTime(timeLeft)}
                  </div>

                  {totalTime > 0 && (
                    <div className="space-y-2">
                      <Progress value={getProgress()} className="h-3" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Progreso: {Math.round(getProgress())}%</span>
                        <span>Calorías: {getCurrentCalories()} kcal</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Timer Controls */}
                <div className="flex justify-center gap-3 flex-wrap">
                  {!isRunning ? (
                    <Button
                      onClick={startTimer}
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      <Play className="h-5 w-5" />
                      {isPaused ? "Reanudar" : "Iniciar"}
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseTimer}
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      <Pause className="h-5 w-5" />
                      Pausar
                    </Button>
                  )}

                  <Button
                    onClick={stopTimer}
                    variant="destructive"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <Square className="h-5 w-5" />
                    Detener
                  </Button>

                  <Button
                    onClick={resetTimer}
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="h-5 w-5" />
                    Reiniciar
                  </Button>
                </div>

                {/* Workout Complete Message */}
                {timeLeft === 0 && totalTime > 0 && (
                  <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                    <CardContent className="pt-6 text-center">
                      <div className="text-green-800 dark:text-green-200">
                        <h3 className="text-lg font-semibold mb-2">
                          ¡Entrenamiento Completado! 🎉
                        </h3>
                        <p>
                          Has quemado aproximadamente{" "}
                          {selectedExercise.caloriesPerMinute *
                            selectedExercise.durationMinutes}{" "}
                          calorías
                        </p>
                        {completing && (
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Registrando ejercicio...</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
