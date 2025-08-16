import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apple, Clock, Zap, Info, Loader2 } from "lucide-react";
import { nutritionApi, type NutritionTip } from "@/lib/api-service";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";

export default function NutritionTips() {
  const [tips, setTips] = useState<NutritionTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const { currentUser } = useAuth();

  useEffect(() => {
    loadNutritionTips();
  }, [activeCategory, currentUser]);

  const loadNutritionTips = async () => {
    try {
      setLoading(true);
      const targetGoal = currentUser?.fitnessGoal || "all";
      const category = activeCategory === "all" ? undefined : activeCategory;

      const data = await nutritionApi.getAll(category, targetGoal);
      setTips(data);
    } catch (error) {
      console.error("Error loading nutrition tips:", error);
      toast.error("Error al cargar los consejos nutricionales");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "pre_workout":
        return <Zap className="h-4 w-4" />;
      case "post_workout":
        return <Clock className="h-4 w-4" />;
      case "general":
        return <Apple className="h-4 w-4" />;
      case "hydration":
        return <Info className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "pre_workout":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "post_workout":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "general":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "hydration":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "pre_workout":
        return "Pre-entreno";
      case "post_workout":
        return "Post-entreno";
      case "general":
        return "General";
      case "hydration":
        return "Hidratación";
      default:
        return category;
    }
  };

  const filteredTips = tips.filter(
    (tip) => activeCategory === "all" || tip.category === activeCategory,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando consejos nutricionales...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Apple className="h-5 w-5" />
            Consejos Nutricionales
          </CardTitle>
          <CardDescription>
            Guías personalizadas para complementar tu entrenamiento con una
            buena alimentación
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="pre_workout">Pre-entreno</TabsTrigger>
          <TabsTrigger value="post_workout">Post-entreno</TabsTrigger>
          <TabsTrigger value="hydration">Hidratación</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredTips.map((tip) => (
              <Card key={tip.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getCategoryIcon(tip.category)}
                      {tip.title}
                    </CardTitle>
                    <Badge className={getCategoryColor(tip.category)}>
                      {getCategoryName(tip.category)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {tip.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTips.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Apple className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No hay consejos disponibles
                </h3>
                <p className="text-muted-foreground">
                  No se encontraron consejos para esta categoría
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Tips Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Recordatorios Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                💧 Hidratación
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Mantén una botella de agua cerca durante tus entrenamientos
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                ⏰ Timing
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Come 30-60 minutos antes del ejercicio para tener energía
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                🍎 Balance
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Combina carbohidratos y proteínas en tus comidas principales
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                😴 Descanso
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Una buena alimentación también incluye dormir bien
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
