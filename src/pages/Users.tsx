import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import { User } from '../types/user';
import PageMeta from '../components/common/PageMeta';
import PageBreadcrumb from '../components/common/PageBreadCrumb';
import ComponentCard from '../components/common/ComponentCard';
import BasicTableOne from '../components/tables/BasicTables/BasicTableOne';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'No se pudieron cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <PageMeta
        title="Usuarios | Fuentes de Rucalhue 2"
        description="En la sección de Usuarios de Fuentes de Rucalhue 2, puedes gestionar y visualizar la información de los residentes, guardias..."
      />
      <PageBreadcrumb pageTitle="Basic Tables" />
      <div className="space-y-6">
        <ComponentCard title="Lista de Usuarios">
          {loading && <p className="text-gray-500">Cargando usuarios...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && (
            // Pasa la variable 'users' como propiedad a tu tabla para renderizarla
            <BasicTableOne data={users} />
          )}
        </ComponentCard>
      </div>
    </>
  );
}
