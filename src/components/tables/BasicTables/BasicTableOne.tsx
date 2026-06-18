import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { User } from "../../../types/user"; 

interface BasicTableOneProps {
  data: User[];
}

export default function BasicTableOne({ data }: BasicTableOneProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Usuario
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Correo Electrónico
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Rol asignado
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Estado
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((usuario) => {
              // Extrae las iniciales de forma segura evitando errores si el campo viene vacío
              const inicialNombre = usuario.first_name ? usuario.first_name.charAt(0).toUpperCase() : "";
              const inicialApellido = usuario.last_name ? usuario.last_name.charAt(0).toUpperCase() : "";

              return (
                <TableRow key={usuario.id}>
                  {/* Columna: Nombre y Apellido */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      {/* Iniciales dinámicas seguras */}
                      <div className="flex items-center justify-center w-10 h-10 overflow-hidden font-semibold text-white rounded-full bg-brand-500 text-theme-sm">
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

                  {/* Columna: Rol con encadenamiento opcional */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="capitalize">
                      {usuario.role?.name || "Sin Rol"}
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
                </TableRow>
              );
            })}
            
            {data.length === 0 && (
              <TableRow>
                <td colSpan={4} className="py-6 text-center text-gray-400">
                  No hay usuarios registrados en el sistema.
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
