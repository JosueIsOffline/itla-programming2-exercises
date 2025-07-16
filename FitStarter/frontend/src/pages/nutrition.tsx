import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apple, Clock, Zap, Info } from "lucide-react";

interface NutritionTip {
  id: number;
  title: string;
  content: string;
  category: string;
}

interface NutritionTipsProps {
  tips: NutritionTip[];
}

export default function NutritionTips({ tips }: NutritionTipsProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTips =
    activeCategory === "all"
      ? tips
      : tips.filter((tip) => tip.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "pre_workout":
        return <Zap className="h-4 w-4" />;
      case "post_workout":
        return <Clock className="h-4 w-4" />;
      case "general":
        return <Apple className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "pre_workout":
        return "bg-orange-100 text-orange-800";
      case "post_workout":
        return "bg-blue-100 text-blue-800";
      case "general":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      default:
        return category;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Apple className="h-5 w-5" />
            Consejos Nutricionales
          </CardTitle>
          <CardDescription>
            Guías simples para complementar tu entrenamiento con una buena
            alimentación
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="pre_workout">Pre-entreno</TabsTrigger>
          <TabsTrigger value="post_workout">Post-entreno</TabsTrigger>
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
        </TabsContent>
      </Tabs>

      {/* Quick Tips Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Recordatorios Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-green-800 mb-2">
                💧 Hidratación
              </h4>
              <p className="text-sm text-green-700">
                Mantén una botella de agua cerca durante tus entrenamientos
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-blue-800 mb-2">⏰ Timing</h4>
              <p className="text-sm text-blue-700">
                Come 30-60 minutos antes del ejercicio para tener energía
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-orange-800 mb-2">🍎 Balance</h4>
              <p className="text-sm text-orange-700">
                Combina carbohidratos y proteínas en tus comidas principales
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-purple-800 mb-2">
                😴 Descanso
              </h4>
              <p className="text-sm text-purple-700">
                Una buena alimentación también incluye dormir bien
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
