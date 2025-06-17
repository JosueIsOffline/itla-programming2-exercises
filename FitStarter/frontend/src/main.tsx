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
      { path: "/timer", element: <Timer /> },
      { path: "/progress", element: <Progress /> },
      { path: "/nutrition", element: <Nutrition /> },
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
