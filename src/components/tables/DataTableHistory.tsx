import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

// 1. IMPORTACIONES DE CONFIGURACIÓN DE DATATABLES
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.html5.mjs'; 
import 'datatables.net-dt/css/dataTables.dataTables.css';

import jszip from 'jszip';
import pdfmake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { notificationService } from '../../services/notificationService'; 
import { AccessNotification } from '../../types/notification';

if (pdfFonts && pdfFonts.pdfMake) {
  (pdfmake as any).vfs = pdfFonts.pdfMake.vfs;
} else if (pdfFonts) {
  (pdfmake as any).vfs = pdfFonts.vfs || pdfFonts;
}

if (typeof window !== 'undefined') {
  (window as any).JSZip = jszip;
  (window as any).pdfmake = pdfmake;
}

DataTable.use(DT);

// 2. CONFIGURACIÓN DE COLUMNAS CON FALLBACKS DE SEGURIDAD
const columnas = [
  { 
    data: 'user', 
    title: 'Usuario',
    render: (data: any, type: unknown, row: AccessNotification) => {
      if (!row.user) return `<span class="text-gray-400">Sin Usuario</span>`;
      
      const firstName = row.user.first_name || '';
      const lastName = row.user.last_name || '';
      const nombreCompleto = `${firstName} ${lastName}`.trim() || 'Usuario Anónimo';
      
      const iniciales = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || 'US';
      const email = row.user.email || 'sin-email@dominio.com';
      
      return `
        <div class="flex items-center gap-3 py-1">
          <div class="h-10 w-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full font-medium text-gray-700 dark:text-gray-200">
            ${iniciales}
          </div>
          <div>
            <span class="block font-medium text-gray-900 dark:text-white">${nombreCompleto}</span>
            <span class="block text-xs text-gray-500 dark:text-gray-400">${email}</span>
          </div>
        </div>
      `;
    }
  },
  { 
    data: 'access_type', 
    title: 'Tipo de Acceso',
    render: (data: string) => {
      const tipo = data || 'peatonal';
      const esVehicular = tipo.toLowerCase() === 'vehicular';
      return `
        <span class="text-gray-600 dark:text-gray-300 font-medium capitalize flex items-center gap-1">
          ${esVehicular ? '🚗' : '🚶‍♂️'} ${tipo}
        </span>
      `;
    }
  },
  { 
    data: 'failure_reason', 
    title: 'Detalles / Ubicación',
    render: (data: string) => `
      <span class="text-gray-500 dark:text-gray-400 text-xs">${data || 'Acceso normal sin observaciones'}</span>
    `
  },
  { 
    data: 'status', 
    title: 'Estado',
    render: (data: string) => {
      const estado = data || 'failed';
      const esSuccess = estado.toLowerCase() === 'success' || estado.toLowerCase() === 'exitoso';
      const clases = esSuccess 
        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
        : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400';
      
      return `
        <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${clases}">
          ${esSuccess ? 'Exitoso' : 'Fallido'}
        </span>
      `;
    }
  },
  { 
    data: 'created_at', 
    title: 'Fecha y Hora',
    render: (data: string) => {
      if (!data) return '';
      const fecha = new Date(data);
      return `
        <span class="text-gray-900 dark:text-white font-medium">
          ${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      `;
    }
  }
];

export default function DataTableHistory() {
  const userRole = localStorage.getItem("user_role") || "";
  const isResident = userRole === "residente";

  const opcionesServerSide = {
    destroy: true,
    serverSide: true, 
    processing: true, 
    pageLength: 8,
    lengthMenu: [8, 16, 24, 32],
    order: [[4, 'desc']], 
    
    ajax: async (dataIdx: any, callback: any) => {
      try {
        const start = dataIdx.start;       
        const length = dataIdx.length;     
        const search = dataIdx.search?.value || "";
        const draw = dataIdx.draw; // Capturamos el secuencial dinámico enviado por DataTables

        // Pasamos start, length, search, draw e isResident al servicio
        const resultadoApi = await notificationService.getAccessHistoryServerSide(start, length, search, draw, isResident);

        // Devolvemos el eco del draw exacto obtenido de la API
        callback({
          draw: resultadoApi.draw,
          recordsTotal: resultadoApi.recordsTotal,
          recordsFiltered: resultadoApi.recordsFiltered,
          data: resultadoApi.data
        });
      } catch (error) {
        console.error("Error al procesar AJAX en la tabla de accesos:", error);
        callback({ draw: dataIdx.draw, recordsTotal: 0, recordsFiltered: 0, data: [] });
      }
    },

    layout: {
      topStart: 'search',
      topEnd: {
        buttons: [
          {
            extend: 'excelHtml5',
            text: 'Exportar Excel',
            className: 'dt-button',
            filename: () => `Historial_Accesos_${new Date().toISOString().split('T')}`
          },
          {
            extend: 'pdfHtml5',
            text: 'Exportar PDF',
            className: 'dt-button',
            orientation: 'portrait',
            pageSize: 'A4',
            title: 'Historial de Accesos' 
          }
        ]
      },
      bottomStart: 'info',
      bottomEnd: ['pageLength', 'paging'] 
    },
    language: {
      search: "", 
      searchPlaceholder: "Buscar en el historial...",
      loadingRecords: "Cargando registros...",
      processing: "Actualizando registros del servidor...",
      info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      infoEmpty: "Mostrando 0 a 0 de 0 registros",
      lengthMenu: "Mostrar _MENU_ filas",
      entries: { _: "registros", 1: "registro" },
      paginate: { first: "Primero", last: "Último", next: "Siguiente", previous: "Anterior" }
    }
  };

  return (
    <div className="overflow-hidden bg-white dark:bg-white/[0.03] p-4 custom-datatable rounded-xl border border-gray-200 dark:border-white/[0.05]">
      <DataTable 
        columns={columnas} 
        options={opcionesServerSide} 
        className="w-full text-left text-sm text-gray-500 dark:text-gray-400" 
      />
    </div>
  );
}
