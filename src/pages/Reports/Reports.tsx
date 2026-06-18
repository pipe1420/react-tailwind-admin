import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BarChartOne from "../../components/charts/bar/BarChartOne";
import PageMeta from "../../components/common/PageMeta";

export default function Reports() {
  return (
    <div>
      <PageMeta
        title="Reportes | Fuentes de Rucalhue 2"
        description="Esta página muestra los reportes de la comunidad, permitiendo visualizar gráficos y estadísticas sobre el acceso de visitantes, residentes y vehículos. Mantén un control detallado de la actividad en tu comunidad para garantizar la seguridad y el orden."
      />
      <PageBreadcrumb pageTitle="Reports" />
      <div className="space-y-6">
        <ComponentCard title="Reportes">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
