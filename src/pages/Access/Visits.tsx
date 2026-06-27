import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function Visits() {
  return (
    <>
      <PageMeta
        title="Registro de Accesos de Visitantes | Fuentes de Rucalhue 2"
        description="Esta página muestra el registro de accesos de visitantes a la comunidad, permitiendo visualizar quién ha ingresado, a qué hora y con qué propósito. Mantén un control detallado de los visitantes para garantizar la seguridad y el orden en tu comunidad."
      />
      <PageBreadcrumb pageTitle="Registro de Accesos de Visitantes" />
      <div className="space-y-6">
        <ComponentCard title="Registro de Accesos de Visitantes">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
