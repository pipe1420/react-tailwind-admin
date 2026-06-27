import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { userService } from "../services/userService";
import { User } from "../types/user";

interface AuthContextType {
  user: User | null;
  first_name?: string;
  last_name?: string;
  email?: string;
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
        // 1. Extraemos los códigos técnicos en un array plano de strings para el Sidebar
        // Filtramos los permisos: solo conservamos aquellos donde 'is_disabled' NO sea true
        const extractedPermissions = data.role?.permissions
          ?.filter((p: any) => !p.is_disabled) 
          ?.map((p: any) => p.code) || [];

        setUser({
          id: data.id,
          email: data.email || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          is_active: data.is_active ?? true,
          phone: data.phone || "",
          avatar: data.avatar || "",

          // RETROCOMPATIBILIDAD: Campos planos que tus componentes y el Sidebar necesitan
          name: data.first_name && data.last_name ? `${data.first_name} ${data.last_name}` : "Usuario",
          role: data.role?.name || "", 
          role_description: data.role?.description || "",
          permissions: extractedPermissions,

          // CORRECCIÓN DE DEPARTMENT: Mapeamos el objeto completo incluyendo parking_spots
          department: data.department ? {
            id: data.department.id,
            number: data.department.number,
            purchase_date: data.department.purchase_date || null,
            condominium_id: data.department.condominium_id,
            parking_spots: data.department.parking_spots || []
          } : null,

          // CORRECCIÓN DE ROLE: Pasamos el objeto estructurado completo
          role_object: {
            name: data.role?.name || "",
            description: data.role?.description || "",
            permissions: data.role?.permissions?.map((p: any) => ({
              code: p.code || "",
              name: p.name || ""
            })) || []
          }
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
    // 🚀 1. Limpiamos el estado en React de inmediato para que la UI reaccione ya
    setUser(null);

    // 🚀 2. Ejecutamos la petición en segundo plano (sin bloquear el redireccionamiento)
    try {
      // Quitamos el await de la petición principal o dejamos que corra de forma "dispara y olvida"
      fetch("API_URL/logout", {
        method: "POST",
        credentials: "include",
      }).catch(err => console.error("Error en background logout:", err));
      
    } catch (error) {
      console.error("Error al destruir la sesión en el servidor:", error);
    }

    // 🚀 3. Redirigimos inmediatamente
    window.location.replace("/signin");
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
