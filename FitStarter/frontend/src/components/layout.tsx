import { useEffect } from "react";
import AppSidebar from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { ThemeProvider } from "./theme-provider";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}
export const Layout = ({ title, children }: LayoutProps) => {
  useEffect(() => {
    console.log("Setting title to:", title);
    document.title = title;
  }, [title]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            {/* Header con el trigger */}
            <header className="sticky top-0 z-40 border-b bg-background">
              <div className="flex h-16 items-center gap-4 px-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold">{title}</h1>
              </div>
            </header>

            {/* Contenido principal */}
            <div className="flex-1 p-6">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};
