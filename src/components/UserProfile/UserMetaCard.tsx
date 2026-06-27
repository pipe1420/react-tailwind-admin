import { useState } from "react";
import type { ChangeEvent } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";

export default function UserMetaCard() {
  const { user } = useAuth();
  const { isOpen, openModal, closeModal } = useModal();
  const [previewImage, setPreviewImage] = useState<string>(
    "/images/user/owner.jpg"
  );

  const handleSave = () => {
    // Handle save logic here
    console.log("Guardando cambios...");
    closeModal();
  };

  const handleProfilePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  if (!user) {
    return (
      <Link to="/signin" className="text-sm font-medium text-gray-700 dark:text-gray-400 hover:underline">
        Iniciar Sesión
      </Link>
    );
  }

  const getInitials = (name: string) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return words[0][0].toUpperCase();
  };
  
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">

            <span className="mr-3 w-20 h-20 overflow-hidden border  border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center">
                {user.avatar && user.avatar !== "/images/user/default-avatar.jpg" ? (
                  <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                    ) : (
                  <div className="flex items-center justify-center w-full h-full font-semibold text-white bg-blue-600 dark:bg-blue-500 text-2xl uppercase">
                    {getInitials(user.name)}
                  </div>
                )}
            </span>
            
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user.name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                
                {/* CORREGIDO: Eliminamos el <p> anidado redundante */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.role_description}
                </p>
                
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>

                {user.department && (
                  <>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Departamento {user.department.number}
                    </p>
                    <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                  </>
                )}

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Condominio Fuentes de Rucalhue 2
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Editar Información Personal
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Actualiza tus datos para mantener tu perfil actualizado.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[|200px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-dashed border-gray-300 p-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={previewImage}
                      alt="Foto de perfil"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        Foto de perfil
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Solo se permite una imagen
                      </p>
                    </div>
                  </div>
                  <label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]">
                    <span>Seleccionar imagen</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple={false}
                      onChange={handleProfilePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Personal Information 
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Información Personal
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nombre</Label>
                    <Input type="text" value="Juan" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Apellido</Label>
                    <Input type="text" value="Perez" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Dirección de Email</Label>
                    <Input type="text" value="juanperez@gmail.com" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Teléfono</Label>
                    <Input type="text" value="+569 1234 5678" />
                  </div>
                </div>
                */ }
                
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cerrar
              </Button>
              <Button size="sm" onClick={handleSave}>
                Guardar Cambios
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
