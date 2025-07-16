import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard.tsx";
import { Layout } from "./components/layout.tsx";
import Settings from "./pages/settings.tsx";
import Exercises from "./pages/exercises.tsx";
import NotFound from "./pages/not-found.tsx";
import WorkoutTimer from "./pages/timer.tsx";
import ProgressTracker from "./pages/progress.tsx";
import NutritionTips from "./pages/nutrition.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout title="FitStarter">
        <Outlet />
      </Layout>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/exercises", element: <Exercises /> },
      { path: "/timer", element: <WorkoutTimer /> },
      { path: "/progress", element: <ProgressTracker /> },
      { path: "/nutrition", element: <NutritionTips /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
