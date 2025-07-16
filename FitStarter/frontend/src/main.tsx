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

import AuthProvider from "./components/auth-provider.tsx";
import ProtectedRoute from "./components/protected-route.tsx";
import { AuthPage } from "./pages/auth.tsx";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
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
