import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard.tsx";
import { Layout } from "./components/layout.tsx";
import Settings from "./pages/settings.tsx";
import Exercises from "./pages/exercises.tsx";
import Progress from "./pages/progress.tsx";
import Nutrition from "./pages/nutrition.tsx";
import Timer from "./pages/timer.tsx";
import NotFound from "./pages/not-found.tsx";
import AuthProvider, { useAuth } from "./components/auth-provider.tsx";
import ProtectedRoute from "./components/protected-route.tsx";
import { AuthPage } from "./pages/auth.tsx";
// Datos de ejemplo
const userData = {
  name: "Josue Hernandez",
  email: "ana.garcia@email.com",
  fitnessGoal: "lose_weight",
  currentWeight: 70.5,
  targetWeight: 68.0,
  memberSince: "2024-01-15",
};

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout title="FitStarter">
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      { path: "/exercises", element: <Exercises /> },
      { path: "/timer", element: <Timer /> },
      { path: "/progress", element: <Progress /> },
      { path: "/nutrition", element: <Nutrition /> },
      { path: "/settings", element: <Settings /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
