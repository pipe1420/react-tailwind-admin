import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { userService } from "../services/userService"; // 👈 Asegúrate de que la ruta de importación sea correcta

interface Department {
  id?: number | null;
  number: string;
  purchase_date?: string;
  condominium_id?: number;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  role_description: string;
  permissions: string[]; // 👈 Lista de nombres: ["Inicio", "Visitas", ...]
  department:  Department | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  fetchUserData: () => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 📡 Función modificada para utilizar el servicio unificado
  const fetchUserData = async () => {
    try {
      const data = await userService.getCurrentUser(); 

      if (data) {
        // Extraemos los nombres de los permisos en un array plano de strings
        const extractedPermissions = data.role?.permissions?.map((p: any) => p.name) || [];
        
        setUser({
          name: data.first_name && data.last_name ? `${data.first_name} ${data.last_name}` : "Usuario",
          email: data.email || "",
          department: data.department ? {
            id: data.department.id,
            number: data.department.number,
            purchase_date: data.department.purchase_date,
            condominium_id: data.department.condominium_id
          } : null,
          role: data.role?.name || "", 
          role_description: data.role?.description || "", 
          permissions: extractedPermissions,
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

  useEffect(() => {
    const checkRouteAndFetch = () => {
      const rutaActual = window.location.pathname;
      const esPaginaPublica = rutaActual === "/signin" || rutaActual === "/signup";

      if (esPaginaPublica) {
        setLoading(false); 
        return;            
      }

      setLoading(true);
      fetchUserData();
    };

    checkRouteAndFetch();

    window.addEventListener("popstate", checkRouteAndFetch);
    return () => window.removeEventListener("popstate", checkRouteAndFetch);
  }, []);

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
    <AuthContext.Provider value={{ user, loading, logout, refreshUser: fetchUserData, fetchUserData }}>
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
