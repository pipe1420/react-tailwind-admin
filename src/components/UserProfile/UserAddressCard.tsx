import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";
import { ParkingSpot } from "../../types/condominium";

export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useAuth();

  // Estados locales para controlar el formulario
  const [departmentNumber, setDepartmentNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);

  // Sincronizar los campos con los datos del usuario cuando se abre el modal
  useEffect(() => {
    if (user?.department) {
      setDepartmentNumber(user.department.number || "");
      setPurchaseDate(user.department.purchase_date || "");
      setParkingSpots(user.department.parking_spots ? [...user.department.parking_spots] : []);
    }
  }, [user, isOpen]);

  // Modificar propiedades de un estacionamiento individual
  const handleSpotChange = (index: number, field: keyof ParkingSpot, value: string) => {
    const updatedSpots = [...parkingSpots];
    updatedSpots[index] = {
      ...updatedSpots[index],
      [field]: value,
    };
    setParkingSpots(updatedSpots);
  };

  // --- NUEVA LÓGICA: AGREGAR ESTACIONAMIENTO DINÁMICAMENTE ---
  const handleAddSpot = () => {
    const newSpot: ParkingSpot = {
      id: 0, // ID 0 o nulo le indica al backend que es un registro totalmente nuevo
      number: "",
      purchase_date: "",
    };
    setParkingSpots([...parkingSpots, newSpot]);
  };

  // --- NUEVA LÓGICA: ELIMINAR ESTACIONAMIENTO DINÁMICAMENTE ---
  const handleRemoveSpot = (indexToRemove: number) => {
    // Filtramos el arreglo excluyendo el índice seleccionado
    const updatedSpots = parkingSpots.filter((_, index) => index !== indexToRemove);
    setParkingSpots(updatedSpots);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        department_number: departmentNumber,
        purchase_date: purchaseDate,
        parking_spots: parkingSpots, // Envía la lista final mutada (con agregados y eliminados)
      };

      //console.log("Payload dinámico listo para el servicio:", payload);

      // LLAMADA A TU SERVICIO:
      // await userService.updateDepartment(payload);

      closeModal();
    } catch (error) {
      console.error("Error al guardar los cambios de la unidad:", error);
    }
  };

  if (!user) {
    return (
      <Link to="/signin" className="text-sm font-medium text-gray-700 dark:text-gray-400 hover:underline">
        Iniciar Sesión
      </Link>
    );
  }

  return (
    <>
      {/* 1. VISTA DE LECTURA DE LA TARJETA */}
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Departamento/Unidad
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Departamento
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.department?.number || "Sin departamento registrado"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Fecha Compra Departamento
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.department?.purchase_date || "Sin fecha de compra registrada"}
                </p>
              </div>

              <div className="col-span-1 lg:col-span-2">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Estacionamientos
                </p>
                <div className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user.department?.parking_spots && user.department.parking_spots.length > 0 ? (
                    <div className="mt-1">
                      <ul className="list-disc pl-5 text-sm font-medium text-gray-800 dark:text-white/90 space-y-1">
                        {user.department.parking_spots.map((spot) => (
                          <li key={spot.id}>
                            N° {spot.number} 
                            {spot.purchase_date && (
                              <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                                (Comprado el: {new Date(spot.purchase_date).toLocaleDateString()})
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No registra estacionamientos asignados.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            Editar
          </button>
        </div>
      </div>

      {/* 2. MODAL DE EDICIÓN AVANZADO */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14 flex justify-between items-start">
            <div>
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Editar Departamento/Unidad
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Modifica, añade o elimina las unidades y estacionamientos asignados a este perfil.
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSave} className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              
              {/* Bloque Uno: Departamento */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 mb-6">
                <div>
                  <Label>Departamento</Label>
                  <Input 
                    type="text" 
                    value={departmentNumber} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDepartmentNumber(e.target.value)} 
                  />
                </div>

                <div>
                  <Label>Fecha Compra Departamento</Label>
                  <Input 
                    type="date" 
                    value={purchaseDate} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPurchaseDate(e.target.value)} 
                  />
                </div>
              </div>

              {/* Encabezado sección Estacionamientos + Botón Agregar */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-5 mb-4 flex items-center justify-between">
                <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Estacionamientos Asignados ({parkingSpots.length})
                </h5>
                <button
                  type="button"
                  onClick={handleAddSpot}
                  className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
                >
                  + Agregar Estacionamiento
                </button>
              </div>

              {/* Bloque Dos: Mapeo de Estacionamientos con botón de Eliminación */}
              {parkingSpots.length > 0 ? (
                <div className="space-y-4">
                  {parkingSpots.map((spot, index) => (
                    <div 
                      key={spot.id || index} 
                      className="relative grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-white/[0.01]"
                    >
                      <div>
                        <Label>Estacionamiento (N°)</Label>
                        <Input 
                          type="text" 
                          value={spot.number} 
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleSpotChange(index, "number", e.target.value)} 
                          placeholder="Ej: E-12"
                        />
                      </div>

                      <div>
                        <Label>Fecha Compra Estacionamiento</Label>
                        <Input 
                          type="date" 
                          value={spot.purchase_date || ""} 
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleSpotChange(index, "purchase_date", e.target.value)} 
                        />
                      </div>

                      {/* Botón de Quitar / Eliminar Tarjeta */}
                      <button
                        type="button"
                        onClick={() => handleRemoveSpot(index)}
                        className="lg:col-span-2 text-right text-xs font-medium text-red-500 hover:text-red-700 hover:underline transition self-end mt-1"
                      >
                        Quitar Estacionamiento
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 dark:bg-white/[0.02] rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                  El usuario no posee estacionamientos asignados en este momento.
                </p>
              )}

            </div>

            {/* Footer de Botones */}
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" type="button" onClick={closeModal}>
                Cancelar
              </Button>
              <Button size="sm" type="submit">
                Guardar Cambios
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}