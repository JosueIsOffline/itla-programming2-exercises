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
import { Timer, Play, Pause, Square, RotateCcw, Flame } from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  type: string;
  duration: number;
  caloriesPerMinute: number;
}

interface WorkoutTimerProps {
  exercises: Exercise[];
  onWorkoutComplete: (exercise: Exercise, duration: number) => void;
}

export default function WorkoutTimer({
  exercises,
  onWorkoutComplete,
}: WorkoutTimerProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            if (selectedExercise) {
              onWorkoutComplete(selectedExercise, Math.floor(totalTime / 60));
            }
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
  }, [isRunning, timeLeft, selectedExercise, totalTime, onWorkoutComplete]);

  const startTimer = () => {
    if (selectedExercise && !isRunning) {
      if (!isPaused) {
        const duration = selectedExercise.duration * 60; // Convert to seconds
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
      const duration = selectedExercise.duration * 60;
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
                          {exercise.duration}min
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
                          <span>{selectedExercise.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span>
                            {selectedExercise.caloriesPerMinute *
                              selectedExercise.duration}{" "}
                            kcal
                          </span>
                        </div>
                      </div>
                    </div>
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
                <div className="flex justify-center gap-3">
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
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6 text-center">
                      <div className="text-green-800">
                        <h3 className="text-lg font-semibold mb-2">
                          ¡Entrenamiento Completado! 🎉
                        </h3>
                        <p>
                          Has quemado aproximadamente{" "}
                          {selectedExercise.caloriesPerMinute *
                            selectedExercise.duration}{" "}
                          calorías
                        </p>
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
