import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 📡 Función única para consultar la sesión real al backend de FastAPI
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 🔑 INDISPENSABLE: Envía de forma automática la cookie HttpOnly
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          name: data.first_name && data.last_name ? `${data.first_name} ${data.last_name}` : "Usuario",
          email: data.email || "",
          avatar: data.avatar_url || "/images/user/default-avatar.jpg",
          role: data.role?.name || "resident", // Extraemos el rol dinámicamente desde tu base de datos
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error al autenticar en AuthContext:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Al cargar o refrescar el navegador, se valida contra la API, nunca contra localStorage
  useEffect(() => {
    fetchUserData();
  }, []);

  // Cierre de sesión seguro: destruye la cookie en FastAPI y limpia la memoria RAM del Front
  const logout = async () => {
    try {
      await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al destruir la sesión en el servidor:", error);
    } finally {
      setUser(null);
      window.location.replace("/signin");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser: fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
