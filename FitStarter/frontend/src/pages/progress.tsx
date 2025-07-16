import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Scale,
  Calendar,
  Target,
} from "lucide-react";

interface UserData {
  name: string;
  fitnessGoal: string;
  currentWeight: number;
  targetWeight: number;
}

interface ProgressEntry {
  id: number;
  date: string;
  weight: number;
  notes: string;
}

interface ProgressTrackerProps {
  userData: UserData;
}

export default function ProgressTracker({ userData }: ProgressTrackerProps) {
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([
    { id: 1, date: "2024-01-15", weight: 72.0, notes: "Inicio del programa" },
    {
      id: 2,
      date: "2024-01-22",
      weight: 71.5,
      notes: "Primera semana completada",
    },
    {
      id: 3,
      date: "2024-01-29",
      weight: 71.0,
      notes: "Mejorando la resistencia",
    },
    { id: 4, date: "2024-02-05", weight: 70.5, notes: "Sintiendo más energía" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight) {
      const newEntry: ProgressEntry = {
        id: progressEntries.length + 1,
        date: new Date().toISOString().split("T")[0],
        weight: Number.parseFloat(weight),
        notes: notes || "",
      };
      setProgressEntries([newEntry, ...progressEntries]);
      setWeight("");
      setNotes("");
    }
  };

  const getWeightTrend = (currentWeight: number, previousWeight: number) => {
    if (currentWeight < previousWeight) {
      return {
        icon: TrendingDown,
        color: "text-green-600",
        text: "Perdiendo peso",
      };
    } else if (currentWeight > previousWeight) {
      return { icon: TrendingUp, color: "text-red-600", text: "Ganando peso" };
    } else {
      return { icon: Minus, color: "text-gray-600", text: "Sin cambios" };
    }
  };

  const getTotalWeightChange = () => {
    if (progressEntries.length < 2) return 0;
    const oldest = progressEntries[progressEntries.length - 1].weight;
    const newest = progressEntries[0].weight;
    return newest - oldest;
  };

  const getGoalProgress = () => {
    const currentWeight = progressEntries[0]?.weight || userData.currentWeight;
    const startWeight =
      progressEntries[progressEntries.length - 1]?.weight ||
      userData.currentWeight;
    const targetWeight = userData.targetWeight;

    const totalNeeded = Math.abs(targetWeight - startWeight);
    const achieved = Math.abs(currentWeight - startWeight);

    return totalNeeded > 0 ? (achieved / totalNeeded) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peso Actual</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progressEntries[0]?.weight || userData.currentWeight} kg
            </div>
            <p className="text-xs text-muted-foreground">
              Meta: {userData.targetWeight} kg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cambio Total</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getTotalWeightChange() > 0 ? "+" : ""}
              {getTotalWeightChange().toFixed(1)} kg
            </div>
            <p className="text-xs text-muted-foreground">Desde el inicio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso Meta</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(getGoalProgress())}%
            </div>
            <p className="text-xs text-muted-foreground">Hacia tu objetivo</p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Registrar Progreso</CardTitle>
          <CardDescription>
            Añade una nueva entrada para seguir tu progreso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="70.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  disabled
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas (opcional)</Label>
              <Textarea
                id="notes"
                placeholder="¿Cómo te sientes? ¿Algún logro especial?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Guardar Progreso
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Progress History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Historial de Progreso
          </CardTitle>
          <CardDescription>Tu evolución a lo largo del tiempo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressEntries.map((entry, index) => {
              const previousEntry = progressEntries[index + 1];
              const trend = previousEntry
                ? getWeightTrend(entry.weight, previousEntry.weight)
                : null;

              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">
                        {entry.weight} kg
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString("es-ES")}
                      </div>
                    </div>
                    {trend && (
                      <div className={`flex items-center gap-1 ${trend.color}`}>
                        <trend.icon className="h-4 w-4" />
                        <span className="text-sm">{trend.text}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right max-w-xs">
                    {entry.notes && (
                      <p className="text-sm text-muted-foreground">
                        {entry.notes}
                      </p>
                    )}
                    {index === 0 && (
                      <Badge className="mt-1">Más reciente</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
