// frontend/src/lib/axios.ts
import axios from "axios";

// Crear una instancia de axios
const api = axios.create({
  baseURL: "http://localhost:5292/api",
  timeout: 10000,
});

// Interceptor para requests - agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para responses - manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          // Intentar refresh token
          const response = await axios.post(
            "http://localhost:5292/api/auth/refresh",
            {
              refreshToken: refreshToken,
            },
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          // Actualizar tokens
          localStorage.setItem("accessToken", accessToken);
          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }

          // Reintentar la request original
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return api.request(error.config);
        } catch (refreshError) {
          // Refresh falló, limpiar todo y redirigir a login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("currentUser");
          window.location.href = "/auth";
        }
      } else {
        // No hay refresh token, limpiar y redirigir
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentUser");
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
