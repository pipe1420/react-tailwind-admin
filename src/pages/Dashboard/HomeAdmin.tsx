import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";

export default function HomeAdmin() {
  return (
    <>
      <PageMeta
        title="Fuentes de Rucalhue 2 - Administración"
        description="Panel de administración para la gestión de accesos, perfiles y estadísticas de Fuentes de Rucalhue 2."
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-6">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 space-y-6 xl:col-span-6">
          <RecentOrders />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        
      </div>
    </>
  );
}
