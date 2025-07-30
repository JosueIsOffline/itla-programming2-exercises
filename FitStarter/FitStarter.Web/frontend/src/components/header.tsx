import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, User, Settings, LogOut, Crown, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "./auth-provider";

export default function Header() {
  const { setTheme } = useTheme();

  const { currentUser, handleLogout } = useAuth();
  const userData = currentUser;

  const theme = localStorage.getItem("vite-ui-theme");

  const getGoalBadge = (goal: string) => {
    switch (goal) {
      case "lose_weight":
        return { text: "Perder Peso", color: "bg-red-100 text-red-800" };
      case "gain_muscle":
        return { text: "Ganar Músculo", color: "bg-blue-100 text-blue-800" };
      case "stay_fit":
        return { text: "Mantenerse Fit", color: "bg-green-100 text-green-800" };
      default:
        return { text: "Objetivo", color: "bg-gray-100 text-gray-800" };
    }
  };

  const goalBadge = getGoalBadge(userData?.fitnessGoal as string);

  const handleTheme = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <header className="h-[3.6rem] border-b border-gray-200/60 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        <div className="hidden md:flex items-center gap-2">
          <h2 className="text-lg text-nowrap font-semibold text-purple-500">
            ¡Hola, {userData?.fullName}!
          </h2>
          <Badge className={goalBadge.color}>{goalBadge.text}</Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        {/* <div className="hidden md:flex relative"> */}
        {/*   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
        {/*   <Input placeholder="Buscar ejercicios..." className="pl-10 w-64" /> */}
        {/* </div> */}

        {/* Theme Toggle */}
        <Button variant="ghost" size="sm" onClick={handleTheme}>
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
            2
          </span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt={userData?.fullName}
                />
                <AvatarFallback className="bg-purple-500 text-white">
                  {userData?.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {userData?.fullName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userData?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Crown className="mr-2 h-4 w-4" />
              <span>Upgrade a Pro</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span onClick={handleLogout}>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
