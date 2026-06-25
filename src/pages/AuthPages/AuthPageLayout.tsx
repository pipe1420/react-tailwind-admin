import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      {/* Forzamos a que el contenedor principal ocupe toda la pantalla en escritorio de forma estricta */}
      <div className="relative flex flex-col justify-center w-full min-h-screen lg:h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        
        {/* 1. SECCIÓN FORMULARIO (Izquierda en web, arriba en móvil) */}
        <div className="flex flex-col justify-center items-center w-full h-full lg:w-1/2 p-4 sm:p-8">
          
          {/* Contenedor del ancho máximo para que el login y el soporte no se estiren infinitamente */}
          <div className="w-full max-w-md flex flex-col justify-center h-full">
            
            {/* Logo móvil: Solo visible en pantallas pequeñas */}
            <div className="flex flex-col items-center mb-8 lg:hidden">
              <Link to="/" className="block mb-3">
                <img
                  width={160}
                  height={33}
                  src="/images/logo/logo-ciss.svg"
                  alt="Logo"
                />
              </Link>
              <p className="text-center text-sm text-gray-400 dark:text-white/60">
                Fuentes de Rucalhue 2 - Administración
              </p>
            </div>

            {/* Formulario e información */}
            {children}
          </div>
        </div>

        {/* 2. PANEL DERECHO (Fijo en 50% de ancho y centrado en escritorio) */}
        <div className="hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:flex lg:items-center lg:justify-center overflow-hidden">
          <div className="relative flex items-center justify-center z-1 w-full h-full">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs z-10">
              <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={48}
                  src="/images/logo/logo-ciss.svg"
                  alt="Logo"
                />
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                Fuentes de Rucalhue 2 - Administración
              </p>
            </div>
          </div>
        </div>

        {/* Botón de tema */}
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}