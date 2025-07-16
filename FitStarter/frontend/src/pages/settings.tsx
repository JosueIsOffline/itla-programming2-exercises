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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Bell,
  Shield,
  Palette,
  Smartphone,
  Mail,
  Lock,
  Crown,
  Camera,
} from "lucide-react";

interface SettingsProps {
  userData: {
    name: string;
    email: string;
    fitnessGoal: string;
    currentWeight: number;
    targetWeight: number;
    memberSince: string;
  };
}

export default function Settings({ userData }: SettingsProps) {
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    progressUpdates: true,
    nutritionTips: false,
    achievements: true,
  });

  const [profile, setProfile] = useState({
    name: userData.name,
    email: userData.email,
    fitnessGoal: userData.fitnessGoal,
    currentWeight: userData.currentWeight.toString(),
    targetWeight: userData.targetWeight.toString(),
  });

  const handleProfileSave = () => {
    // Aquí iría la lógica para guardar el perfil
    console.log("Perfil guardado:", profile);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600 mt-2">
          Personaliza tu experiencia en FitPro
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
              <CardDescription>
                Actualiza tu información de perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src="/placeholder.svg?height=80&width=80"
                      alt={profile.name}
                    />
                    <AvatarFallback className="bg-blue-600 text-white text-xl">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-gray-600">{profile.email}</p>
                  <Badge className="mt-1 bg-blue-100 text-blue-800">
                    Miembro desde {new Date(userData.memberSince).getFullYear()}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="goal">Objetivo fitness</Label>
                  <Select
                    value={profile.fitnessGoal}
                    onValueChange={(value) =>
                      setProfile((prev) => ({ ...prev, fitnessGoal: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose_weight">Perder peso</SelectItem>
                      <SelectItem value="gain_muscle">Ganar músculo</SelectItem>
                      <SelectItem value="stay_fit">Mantenerse fit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-weight">Peso actual (kg)</Label>
                  <Input
                    id="current-weight"
                    type="number"
                    step="0.1"
                    value={profile.currentWeight}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        currentWeight: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-weight">Peso objetivo (kg)</Label>
                  <Input
                    id="target-weight"
                    type="number"
                    step="0.1"
                    value={profile.targetWeight}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        targetWeight: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <Button onClick={handleProfileSave} className="w-full md:w-auto">
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificaciones
              </CardTitle>
              <CardDescription>
                Configura qué notificaciones quieres recibir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">
                      Recordatorios de entrenamiento
                    </h4>
                    <p className="text-sm text-gray-600">
                      Recibe recordatorios para tus sesiones programadas
                    </p>
                  </div>
                  <Switch
                    checked={notifications.workoutReminders}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("workoutReminders", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Actualizaciones de progreso</h4>
                    <p className="text-sm text-gray-600">
                      Resúmenes semanales de tu progreso
                    </p>
                  </div>
                  <Switch
                    checked={notifications.progressUpdates}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("progressUpdates", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Consejos nutricionales</h4>
                    <p className="text-sm text-gray-600">
                      Tips diarios sobre alimentación saludable
                    </p>
                  </div>
                  <Switch
                    checked={notifications.nutritionTips}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("nutritionTips", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Logros y insignias</h4>
                    <p className="text-sm text-gray-600">
                      Notificaciones cuando alcances nuevos logros
                    </p>
                  </div>
                  <Switch
                    checked={notifications.achievements}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("achievements", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Seguridad
              </CardTitle>
              <CardDescription>
                Gestiona la seguridad de tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="mr-2 h-4 w-4" />
                Cambiar contraseña
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Smartphone className="mr-2 h-4 w-4" />
                Configurar autenticación de dos factores
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Verificar correo electrónico
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upgrade Card */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Crown className="h-5 w-5" />
                Upgrade a Pro
              </CardTitle>
              <CardDescription className="text-yellow-700">
                Desbloquea funciones premium
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-yellow-800 mb-4">
                <li>• Rutinas personalizadas</li>
                <li>• Análisis avanzado</li>
                <li>• Sin anuncios</li>
                <li>• Soporte prioritario</li>
              </ul>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                Actualizar ahora
              </Button>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Preferencias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Idioma</Label>
                <Select defaultValue="es">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Unidades</Label>
                <Select defaultValue="metric">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Métrico (kg, cm)</SelectItem>
                    <SelectItem value="imperial">Imperial (lb, ft)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Zona horaria</Label>
                <Select defaultValue="america/mexico">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america/mexico">
                      América/México
                    </SelectItem>
                    <SelectItem value="america/new_york">
                      América/Nueva York
                    </SelectItem>
                    <SelectItem value="europe/madrid">Europa/Madrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Soporte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Centro de ayuda
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Contactar soporte
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Reportar un problema
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
