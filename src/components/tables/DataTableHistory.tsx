import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

// 1. IMPORTACIÓN BASE DE BOTONES Y SUS SUBMÓDULOS HTML5 (Soluciona el error de "unknown button type")
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.html5.mjs'; 

// 2. IMPORTACIÓN DE ESTILOS OBLIGATORIOS
import 'datatables.net-dt/css/dataTables.dataTables.css';

// 3. UTILIDADES DE COMPILACIÓN PARA GENERAR ARCHIVOS
import jszip from 'jszip';
import pdfmake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Configuración de fuentes requeridas nativamente por pdfmake
if (pdfFonts && pdfFonts.pdfMake) {
  (pdfmake as any).vfs = pdfFonts.pdfMake.vfs;
} else if (pdfFonts) {
  (pdfmake as any).vfs = pdfFonts.vfs || pdfFonts;
}

// 4. ASIGNACIÓN GLOBAL REQUERIDA POR LOS BOTONES HTML5
if (typeof window !== 'undefined') {
  (window as any).JSZip = jszip;
  (window as any).pdfmake = pdfmake;
}
// Inicializa el core
DataTable.use(DT);

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

// 4. CONFIGURACIÓN DE COLUMNAS ACTUALIZADA (INCLUYE TEAM)
const columnas = [
  { 
    data: 'user.name', 
    title: 'Nombre',
    render: (data: unknown, type: unknown, row: Order) => {
      return `
        <div class="flex items-center gap-3 py-1">
          <div class="h-10 w-10 overflow-hidden rounded-full">
            <img src="${row.user.image}" alt="${row.user.name}" class="h-full w-full object-cover" />
          </div>
          <div>
            <span class="block font-medium text-gray-900 dark:text-white">${row.user.name}</span>
            <span class="block text-xs text-gray-500 dark:text-gray-400">${row.user.role}</span>
          </div>
        </div>
      `;
    }
  },
  { 
    data: 'projectName', 
    title: 'Proyecto',
    render: (data: string) => `
      <span class="text-gray-600 dark:text-gray-300 font-medium">${data}</span>
    `
  },
  { 
    data: 'team.images', 
    title: 'Team',
    render: (data: string[], type: unknown, row: Order) => {
      const avatarHTML = row.team.images
        .map((img) => `
          <div class="h-6 w-6 overflow-hidden rounded-full border border-white dark:border-gray-900 -mr-2">
            <img src="${img}" class="h-full w-full object-cover" alt="team member" />
          </div>
        `)
        .join('');
      return `<div class="flex items-center">${avatarHTML}</div>`;
    }
  },
  { 
    data: 'status', 
    title: 'Estado',
    render: (data: string) => {
      const colorMap: Record<string, string> = {
        Active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
        Pending: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
        Cancel: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
      };
      const clases = colorMap[data] || 'bg-gray-50 text-gray-700';
      
      return `
        <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${clases}">
          ${data}
        </span>
      `;
    }
  },
  { 
    data: 'budget', 
    title: 'Presupuesto',
    render: (data: string) => `
      <span class="text-gray-900 dark:text-white font-semibold">$${data}</span>
    `
  }
];

const tableData: Order[] = [
  {
    id: 1,
    user: { image: "/images/user/user-17.jpg", name: "Lindsey Curtis", role: "Web Designer" },
    projectName: "Agency Website",
    team: { images: ["/images/user/user-22.jpg", "/images/user/user-23.jpg", "/images/user/user-24.jpg"] },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: { image: "/images/user/user-18.jpg", name: "Kaiya George", role: "Project Manager" },
    projectName: "Technology",
    team: { images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"] },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: { image: "/images/user/user-17.jpg", name: "Zain Geidt", role: "Content Writing" },
    projectName: "Blog Writing",
    team: { images: ["/images/user/user-27.jpg"] },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: { image: "/images/user/user-20.jpg", name: "Abram Schleifer", role: "Digital Marketer" },
    projectName: "Social Media",
    team: { images: ["/images/user/user-28.jpg", "/images/user/user-29.jpg", "/images/user/user-30.jpg"] },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: { image: "/images/user/user-21.jpg", name: "Carla George", role: "Front-end Developer" },
    projectName: "Website",
    team: { images: ["/images/user/user-31.jpg", "/images/user/user-32.jpg", "/images/user/user-33.jpg"] },
    budget: "4.5K",
    status: "Active",
  },
];

const opciones2 = {
  destroy: true, // <-- AÑADE ESTA LÍNEA AQUÍ
  layout: {
    topStart: 'search',
    topEnd: {
      buttons: [
        {
          extend: 'excelHtml5',
          text: 'Exportar Excel',
          className: 'dt-button',
          filename: () => {
            const ahora = new Date();
            const fecha = ahora.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
            // Extrae hora y minutos reemplazando los dos puntos por guiones para evitar caracteres inválidos en Windows
            const hora = ahora.toTimeString().split(' ')[0].replace(/:/g, '-'); 
            return `Historial_Accesos_${fecha}_${hora}`;
          }
        },
        {
          extend: 'pdfHtml5',
          text: 'Exportar PDF',
          className: 'dt-button',
          orientation: 'portrait',
          pageSize: 'A4',
          filename: () => {
            const ahora = new Date();
            const fecha = ahora.toISOString().split('T')[0];
            const hora = ahora.toTimeString().split(' ')[0].replace(/:/g, '-');
            return `Historial_Accesos_${fecha}_${hora}`;
          },
          title: 'Historial de Accesos' 
        }
      ]
    },
    bottomStart: 'info',
    bottomEnd: 'pageLength'
  },
  language: {
    search: "", 
    searchPlaceholder: "Buscar en el historial...",
    info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
    infoEmpty: "Mostrando 0 a 0 de 0 registros",
    lengthMenu: "Mostrar _MENU_ filas",
    entries: {
      _: "registros",
      1: "registro"
    }
  }
};


export default function DataTableHistory() {
  return (
    <div className="overflow-hidden bg-white dark:bg-white/[0.03] p-4 custom-datatable rounded-xl border border-gray-200 dark:border-white/[0.05]">
      <DataTable 
        data={tableData} 
        columns={columnas} 
        options={opciones2} 
        className="w-full text-left text-sm text-gray-500 dark:text-gray-400" 
      />
    </div>
  );
}
