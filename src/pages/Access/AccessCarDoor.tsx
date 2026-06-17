import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function AccessCarDoor() {
  return (
    <div>
      <PageMeta
        title="Acceso Portón Vehicular | Fuentes de Rucalhue 2"
        description="Esta página permite gestionar el acceso al portón vehicular, permitiendo o denegando la entrada a los vehículos autorizados. Mantén el control de quién puede ingresar a través del portón vehicular para garantizar la seguridad y el orden en tu comunidad."
      />
      <PageBreadcrumb pageTitle="Acceso Portón Vehicular" />
      
      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-2 xl:py-2">
        <div className="p-5 rounded-2xllg:p-6">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Acceso Portón Vehicular
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Aquí puedes gestionar el acceso al portón vehicular, permitiendo o denegando la entrada a los vehículos autorizados.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              aria-label="Abrir portón"
              onClick={() => alert('Acción: Abrir portón')}
              className="flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              style={{ width: '190px', height: '190px' }}
            >
              <span className="text-lg font-semibold sm:text-xl">Abrir</span>
            </button>
          </div>

          <br/>

        </div>
      </div>
    </div>
  );
}
