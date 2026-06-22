import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { userService } from "../../services/userService"; // Ajusta esta ruta si es necesario

// 1. Extendemos la interfaz User localmente de forma segura para aceptar role_id y evitar errores de tipado
interface UserWithRoleId {
  id?: number;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  role_id?: number;
  role?: {
    name: string;
  } | string;
}

export default function Users() {
  const [data, setData] = useState<UserWithRoleId[]>([]);
  const [loading, setLoading] = useState(true);

  // 📡 Consumo único y seguro de los datos reales de FastAPI
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await userService.getAllUsers();
        setData(usersData);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Mapeo seguro basado en la estructura exacta de tu Seeding de FastAPI
  const obtenerNombreRol = (roleId: number | undefined) => {
    switch (roleId) {
      case 1: return "Administrador";
      case 2: return "Residente";
      case 3: return "Guardia";
      case 4: return "Desarrollador";
      default: return "Residente";
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 font-medium">
        Cargando listado oficial de usuarios...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Administración de Usuarios
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Lista oficial de residentes y personal de Fuentes de Rucalhue 2
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header corregido sin errores de TypeScript */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Usuario
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Correo Electrónico
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Rol asignado
                </th>
                <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Estado
                </th>
              </TableRow>
            </TableHeader>

            {/* Table Body Dinámico */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {Array.isArray(data) && data.map((usuario) => {
                if (!usuario) return null;

                const inicialNombre = usuario.first_name ? usuario.first_name.charAt(0).toUpperCase() : "";
                const inicialApellido = usuario.last_name ? usuario.last_name.charAt(0).toUpperCase() : "";

                const nombreRol = typeof usuario.role === 'object' && usuario.role 
                  ? usuario.role.name 
                  : obtenerNombreRol(usuario.role_id);

                return (
                  <TableRow key={usuario.id || usuario.email}>
                    {/* Columna: Nombre y Apellido */}
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 overflow-hidden font-semibold text-white rounded-full bg-brand-500 text-theme-sm uppercase">
                          {inicialNombre}{inicialApellido}
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {usuario.first_name} {usuario.last_name}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Columna: Correo */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {usuario.email}
                    </TableCell>

                    {/* Columna: Rol */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <span className="capitalize">
                        {nombreRol}
                      </span>
                    </TableCell>

                    {/* Columna: Estado Activo/Inactivo */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={usuario.is_active ? "success" : "error"}
                      >
                        {usuario.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <button className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ">
                        Editar
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {(!data || data.length === 0) && (
                <TableRow>
                  {/* Usamos una etiqueta td estándar para colSpan nativo */}
                  <td colSpan={4} className="py-6 text-center text-gray-400 text-sm">
                    No hay usuarios registrados en el sistema.
                  </td>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
    


    


  );
}
