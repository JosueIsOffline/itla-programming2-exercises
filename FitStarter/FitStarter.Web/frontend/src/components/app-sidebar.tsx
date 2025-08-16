import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Dumbbell,
  Timer,
  TrendingUp,
  Apple,
  Settings,
  Activity,
  Target,
  Crown,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "./auth-provider";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    description: "Resumen general",
  },
  {
    title: "Ejercicios",
    url: "/exercises",
    icon: Dumbbell,
    description: "Biblioteca de ejercicios",
  },
  {
    title: "Cronómetro",
    url: "/timer",
    icon: Timer,
    description: "Temporizador",
  },
  {
    title: "Progreso",
    url: "/progress",
    icon: TrendingUp,
    description: "Seguimiento de resultados",
  },
  {
    title: "Nutrición",
    url: "/nutrition",
    icon: Apple,
    description: "Consejos alimentarios",
  },
];

const secondaryItems = [
  {
    title: "Configuración",
    url: "/settings",
    icon: Settings,
    description: "Ajustes de la aplicación",
  },
];

export default function AppSidebar() {
  const { pathname } = useLocation();
  const { currentUser } = useAuth();

  return (
    <Sidebar className="border-r border-gray-200/60">
      <SidebarHeader className="border-b border-gray-200/60 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-purple-500">FitStarter</h1>
            {/* <p className="text-xs text-gray-500">Entrenador Virtual</p> */}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent className="gap-y-2.5">
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={cn(
                        "w-full transition-colors h-10 pb-2.5 hover:bg-purple-600/60",
                        isActive && "!bg-purple-600/60",
                      )}
                      asChild
                    >
                      <NavLink to={item.url}>
                        <Icon className="h-4 w-4" />
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Configuration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={cn(
                        "w-full transition-colors h-10 pb-2.5 hover:bg-purple-600/60",
                        isActive && "!bg-purple-600/60",
                      )}
                      asChild
                    >
                      <NavLink to={item.url}>
                        <Icon className="h-4 w-4" />
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upgrade Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="mx-2 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-800">
                  Upgrade Pro
                </span>
              </div>
              <p className="text-xs text-yellow-700 mb-3">
                Desbloquea rutinas personalizadas y análisis avanzado
              </p>
              <SidebarMenuButton
                disabled
                className="w-full h-12 bg-yellow-600 text-sm text-white text-balance hover:bg-yellow-700"
              >
                <Crown className="h-4 w-4" />
                Upgrade (available soon)
              </SidebarMenuButton>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200/60 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Ana García"
            />
            <AvatarFallback className="bg-purple-600 text-white">
              {currentUser?.fullName
                .trim()
                .split(" ")
                .filter((p) => p.length > 0)
                .reduce((acc, val, idx, arr) => {
                  if (idx === 0) return val[0];
                  if (idx === arr.length - 2) return acc + val[0];
                  return acc;
                }, "")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-purple-600 truncate">
              {currentUser?.fullName}
            </p>
            <div className="flex items-center gap-2">
              {/* <Badge variant="secondary" className="text-xs"> */}
              {/*   Pro */}
              {/* </Badge> */}
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3 text-green-500" />
                <span className="text-xs text-gray-500">Meta: 68kg</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
