import { useEffect } from "react";
import AppSidebar from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";
import { ThemeProvider } from "./theme-provider";
import Header from "./header";
import { useAuth } from "./auth-provider";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}
export const Layout = ({ title, children }: LayoutProps) => {
  const { currentUser } = useAuth();
  useEffect(() => {
    console.log("Setting title to:", title);
    document.title = title;
  }, [title]);

  if (!currentUser) {
    return null;
  }
  //
  // const data = {
  //   name: "Josue",
  //   email: "example@test.com",
  //   fitnessGoal: "gain_muscle",
  // };

  const userData = {
    name: currentUser.FullName,
    email: currentUser.Email,
    fitnessGoal: currentUser.FitnessGoal,
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            {/* <header className="sticky top-0 z-40 border-b bg-background"> */}
            {/*   <div className="flex h-16 items-center gap-4 px-4"> */}
            {/*     <SidebarTrigger /> */}
            {/*     <h1 className="text-xl font-semibold">{title}</h1> */}
            {/*   </div> */}
            {/* </header> */}
            <Header userData={userData} />

            <div className="flex-1 p-6">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};
