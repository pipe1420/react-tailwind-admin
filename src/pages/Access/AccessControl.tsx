import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function AccessControl() {
  return (
    <div>
      <PageMeta
        title="Acceso Portón Vehicular | Fuentes de Rucalhue 2"
        description="Esta página permite gestionar el acceso al portón vehicular, permitiendo o denegando la entrada a los vehículos autorizados. Mantén el control de quién puede ingresar a través del portón vehicular para garantizar la seguridad y el orden en tu comunidad."
      />
      <PageBreadcrumb pageTitle="Acceso Portón Vehicular" />

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">
          <div>
            <div className="mx-auto w-full max-w-[385px]">
              <h2 className="font-bold text-center text-gray-800 mb-7 text-title-sm dark:text-white/90">
                Flexible Plans Tailored to Fit Your Unique Needs!
              </h2>
            </div>
            <div>
              <div className="grid gap-5 gird-cols-1 sm:grid-cols-2 xl:grid-cols-2 xl:gap-6">

                {/* Acceso Vehicular */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                  <span className="block mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                    Acceso Vehicular
                  </span>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Aquí puedes gestionar el acceso al portón vehicular, permitiendo o denegando la entrada a los vehículos autorizados.
                  </p>
                  <div className="w-full h-px my-6 bg-gray-200 dark:bg-gray-800"></div>
                  
                  <div className="mt-8 flex justify-center">   
                    <button onClick={() => alert("Acción: Abrir portón Vehicular")}
                    className="flex w-full items-center justify-center rounded-lg bg-blue-600 p-3.5 text-sm font-medium text-white shadow-theme-xs transition-colors hover:bg-blue-600 dark:hover:bg-blue-600"
                    style={{ width: "190px", height: "190px" }}>
                      Abrir Acceso Vehicular
                    </button>
                  </div>
                </div>

                {/* Acceso Peatonal */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] ">
                  <span className="block mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                    Acceso Peatonal
                  </span>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Aquí puedes gestionar el acceso al portón peatonal, permitiendo o denegando la entrada a los peatones autorizados.
                  </p>
                  <div className="w-full h-px my-6 bg-gray-200 dark:bg-gray-800"></div>
                 
                  <div className="mt-8 flex justify-center">   
                    <button onClick={() => alert("Acción: Abrir portón Peatonal")}
                    className="flex w-full items-center justify-center rounded-lg  bg-blue-600 p-3.5 text-sm font-medium text-white shadow-theme-xs transition-colors hover:bg-blue-600 dark:hover:bg-blue-600"
                    style={{ width: "190px", height: "190px" }}>
                      Abrir Acceso Peatonal
                    </button>
                  </div>
                  <br/><br/>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
