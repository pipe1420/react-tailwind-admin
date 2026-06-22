import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function Vehicles() {
  return (
    <>
      <PageMeta
        title="Vehiculos | Fuentes de Rucalhue 2"
        description=""
      />
      <PageBreadcrumb pageTitle="Vehículos" />
      <div className="space-y-6">
        <ComponentCard title="Vehículos">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
