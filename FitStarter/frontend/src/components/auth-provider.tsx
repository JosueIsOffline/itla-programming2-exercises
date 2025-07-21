import type { User } from "@/types/user";
import type { RegisterData } from "@/types/user";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import axios from "axios";

type AuthContext = {
  authToken?: string | null;
  currentUser: User | null;
  isLoading: boolean;
  handleLogin: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  handleRegister: (
    data: RegisterData,
  ) => Promise<{ success: boolean; error?: string }>;
  handleLogout: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("currentUser");

    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  async function handleLogin(email: string, password: string) {
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5292/api/auth/login", {
        email,
        password,
      });

      const { accessToken, user } = res.data;

      setAuthToken(accessToken);
      setCurrentUser(user);

      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("currentUser", JSON.stringify(user));

      return { success: true };
    } catch (error: any) {
      setAuthToken("");
      setCurrentUser(null);

      const errorMessage =
        error.response?.data?.message || "Error al iniciar sesión";
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegister(data: RegisterData) {
    try {
      setIsLoading(true);
      const registerPayload = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        fitnessGoal: data.fitnessGoal,
        weightKg: data.weightKg,
        heightCm: data.heightCm,
        experienceLevel: data.experienceLevel,
      };

      const res = await axios.post(
        "http://localhost:5292/api/auth/register",
        registerPayload,
      );

      const { accessToken, user } = res.data;

      setAuthToken(accessToken);

      setCurrentUser(user);

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("currentUser", JSON.stringify(user));

      return { success: true };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al crear la cuenta";
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    setAuthToken("");
    setCurrentUser(null);

    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
  }

  const isAuthenticated = !!authToken && !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        isLoading,
        handleLogin,
        handleRegister,
        handleLogout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be inside of a AuthProvider");
  return context;
}
