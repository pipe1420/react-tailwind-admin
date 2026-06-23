import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function AccessHistory() {
  return (
    <>
      <PageMeta
        title="Accesos Historial"
        description=""
      />
      <PageBreadcrumb pageTitle="Historial de Accesos" />
      <div className="space-y-6">
        <ComponentCard title="Historial de Accesos">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
