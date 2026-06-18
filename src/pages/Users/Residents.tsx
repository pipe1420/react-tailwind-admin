import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function Residents() {
  return (
    <>
      <PageMeta
        title="Residentes | Fuentes de Rucalhue 2"
        description="Esta página muestra el registro de residentes en la comunidad, permitiendo visualizar quién vive aquí, a qué hora y con qué propósito. Mantén un control detallado de los residentes para garantizar la seguridad y el orden en tu comunidad."
      />
      <PageBreadcrumb pageTitle="Registro de Residentes" />
      <div className="space-y-6">
        <ComponentCard title="Registro de Residentes">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
