import { useState, useEffect } from "react";
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
  Loader2,
  Plus,
} from "lucide-react";
import {
  progressApi,
  type UserProgress,
  type ProgressSummary,
} from "@/lib/api-service";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";

export default function ProgressTracker() {
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [notes, setNotes] = useState("");
  const [progressEntries, setProgressEntries] = useState<UserProgress[]>([]);
  const [summary, setSummary] = useState<ProgressSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    try {
      setLoading(true);
      const [entriesData, summaryData] = await Promise.all([
        progressApi.getAll(),
        progressApi.getSummary(),
      ]);

      setProgressEntries(entriesData);
      setSummary(summaryData);
    } catch (error) {
      console.error("Error loading progress data:", error);
      toast.error("Error al cargar los datos de progreso");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!weight && !bodyFat) {
      toast.error("Ingresa al menos el peso o el porcentaje de grasa corporal");
      return;
    }

    try {
      setSubmitting(true);
      await progressApi.create({
        weightKg: weight ? parseFloat(weight) : undefined,
        bodyFatPercent: bodyFat ? parseFloat(bodyFat) : undefined,
        notes: notes || "",
      });

      toast.success("Progreso registrado exitosamente");
      setWeight("");
      setBodyFat("");
      setNotes("");
      await loadProgressData();
    } catch (error) {
      console.error("Error saving progress:", error);
      toast.error("Error al guardar el progreso");
    } finally {
      setSubmitting(false);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando datos de progreso...</span>
      </div>
    );
  }

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
              {summary?.currentWeight
                ? `${summary.currentWeight} kg`
                : "No registrado"}
            </div>
            <p className="text-xs text-muted-foreground">
              Meta: {currentUser?.weightKg || "No definida"} kg
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
              {summary?.weightChange ? (
                <>
                  {summary.weightChange > 0 ? "+" : ""}
                  {summary.weightChange.toFixed(1)} kg
                </>
              ) : (
                "No disponible"
              )}
            </div>
            <p className="text-xs text-muted-foreground">Desde el inicio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Registros
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary?.totalEntries || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {summary?.lastRecordDate
                ? `Último: ${formatDate(summary.lastRecordDate)}`
                : "Sin registros"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Registrar Progreso
          </CardTitle>
          <CardDescription>
            Añade una nueva entrada para seguir tu progreso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="70.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyFat">Grasa Corporal (%)</Label>
                <Input
                  id="bodyFat"
                  type="number"
                  step="0.1"
                  placeholder="15.5"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
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
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Guardando...
                </>
              ) : (
                "Guardar Progreso"
              )}
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
            {progressEntries.length === 0 ? (
              <div className="text-center py-8">
                <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No hay registros de progreso
                </h3>
                <p className="text-muted-foreground">
                  Añade tu primer registro para comenzar a seguir tu progreso
                </p>
              </div>
            ) : (
              progressEntries.map((entry, index) => {
                const previousEntry = progressEntries[index + 1];
                const trend =
                  previousEntry && entry.weightKg && previousEntry.weightKg
                    ? getWeightTrend(entry.weightKg, previousEntry.weightKg)
                    : null;

                return (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold">
                          {entry.weightKg
                            ? `${entry.weightKg} kg`
                            : "No registrado"}
                        </div>
                        {entry.bodyFatPercent && (
                          <div className="text-sm text-muted-foreground">
                            {entry.bodyFatPercent}% grasa
                          </div>
                        )}
                        <div className="text-sm text-muted-foreground">
                          {formatDate(entry.recordDate)}
                        </div>
                      </div>
                      {trend && (
                        <div
                          className={`flex items-center gap-1 ${trend.color}`}
                        >
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
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
