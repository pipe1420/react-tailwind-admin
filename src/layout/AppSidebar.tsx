import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

import {
  BoxCubeIcon,
  ChevronDownIcon,
  GridIcon,
  ListIcon,
  PlugInIcon,
  PieChartIcon,
  CalenderIcon,
  PageIcon,
  DocsIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  code?: string; 
  icon: React.ReactNode;
  path?: string;
  pro?: boolean;
  new?: boolean;
  subItems?: {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
  }[];
};

// 1. LISTA MAESTRA DE USUARIO/RESIDENTE
const ResidentItems: NavItem[] = [
  { name: "Inicio", code: "dashboard", icon: <GridIcon />, path: "/" },
  { name: "Accesos", code: "access", icon: <PageIcon />, path: "/access", new: true },
  { name: "Visitas", code: "visits", icon: <PageIcon />, path: "/visits" },
  { name: "Residentes", code: "residents", icon: <CalenderIcon />, path: "/residents" },
  { name: "Vehículos", code: "vehicles", icon: <CalenderIcon />, path: "/vehicles" },
  { name: "Historial", code: "history", icon: <ListIcon />, path: "/history", new: true },
  { name: "Usuarios", code: "users", icon: <BoxCubeIcon/>, path: "/users", new: true },
  { name: "Reportes", code: "reports", icon: <PieChartIcon />, path: "/reports" },
  { name: "Configuración", code: "settings", icon: <PlugInIcon />, path: "/config" },
];

// 2. LISTA MAESTRA DE DESARROLLO (Ahora cada uno tiene su 'code' para ser evaluado contra la BD)
const DevItems: NavItem[] = [ 
  { name: "Conexiones", code: "connections", icon: <PlugInIcon />, path: "/connections" },
  { name: "Logs", code: "logs", icon: <DocsIcon />, path: "/logs" },
  { name: "Diagnóstico", code: "diagnostics", icon: <ListIcon />, path: "/diagnostic", new: true},
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();

  // Mapeo unificado de permisos del backend
  const allowedMenus = useMemo(() => {
    const rawPermissions = 
      user?.permissions || 
      user?.role_object?.permissions || 
      user?.role?.permissions || 
      [];
    
    return new Set<string>(
      rawPermissions
        .map((p: any) => {
          if (typeof p === "string") return p; 
          if (p && typeof p === "object" && !p.is_disabled) return p.code; 
          return null;
        })
        .filter((code): code is string => typeof code === "string")
    );
  }, [user]);
    
  // Filtrado de ítems normales por base de datos
  const filteredResidentItems = useMemo(() => {
    return ResidentItems.filter(item => 
      item.code && allowedMenus.has(item.code)
    );
  }, [allowedMenus]);

  // UNIFICADO: Los ítems de desarrollo ahora también se filtran dinámicamente por código de base de datos
  const filteredDevItems = useMemo(() => {
    return DevItems.filter(item => 
      item.code && allowedMenus.has(item.code)
    );
  }, [allowedMenus]);


  const [openSubmenu, setOpenSubmenu] = useState<{ type: "main" | "others"; index: number; } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const renderBadge = (isItemActive: boolean, label: "Nuevo" | "Muy pronto") => (
    <span className={`ml-auto ${isItemActive ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"} menu-dropdown-badge`}>
      {label}
    </span>
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? filteredResidentItems : filteredDevItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType as "main" | "others", index });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) setOpenSubmenu(null);
  }, [location, isActive, filteredResidentItems, filteredDevItems]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => {
        const isNavActive = nav.path ? isActive(nav.path) : false;
        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-active" : "menu-item-inactive"} cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
              >
                <span className={`menu-item-icon-size ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="ml-auto flex items-center gap-1">
                    {nav.new && renderBadge(isNavActive, "Nuevo")}
                    {nav.pro && renderBadge(isNavActive, "Muy pronto")}
                  </span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronDownIcon className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "rotate-180 text-brand-500" : ""}`} />
                )}
              </button>
            ) : (
              nav.path && (
                <Link to={nav.path} className={`menu-item group ${isNavActive ? "menu-item-active" : "menu-item-inactive"}`}>
                  <span className={`menu-item-icon-size ${isNavActive ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>{nav.icon}</span>
                  {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="ml-auto flex items-center gap-1">
                      {nav.new && renderBadge(isNavActive, "Nuevo")}
                      {nav.pro && renderBadge(isNavActive, "Muy pronto")}
                    </span>
                  )}
                </Link>
              )
            )}
            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => { subMenuRefs.current[`${menuType}-${index}`] = el; }}
                className="overflow-hidden transition-all duration-300"
                style={{ height: openSubmenu?.type === menuType && openSubmenu?.index === index ? `${subMenuHeight[`${menuType}-${index}`] || 0}px` : "0px" }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link to="/" className="flex items-center gap-2">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img className="dark:hidden" src="/images/logo/logo_edificios.svg" alt="Logo" width={32} height={32} />
              <img className="hidden dark:block" src="/images/logo/logo_edificios.svg" alt="Logo" width={32} height={32} />
              <p className="ml-2 text-lg font-bold text-gray-900 dark:text-white">Fuentes de Rucalhue 2</p>
            </>
          ) : (
            <img src="/images/logo/logo_edificios.svg" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar flex-grow">
        <nav className="mb-6">
          <div className="sidebar-container flex flex-col">
            {/* Menú Principal */}
            {renderMenuItems(filteredResidentItems, "main")}
            
            {/* Menú de Desarrollo Dinámico */}
            {filteredDevItems.length > 0 && (
              <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                <p className={`text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 ${!isExpanded && !isHovered ? "text-center" : "px-3"}`}>
                  {isExpanded || isHovered || isMobileOpen ? "Configuración Avanzada" : "Desarrollador"}
                </p>
                {renderMenuItems(filteredDevItems, "others")}
              </div>
            )}
          </div>
        </nav>
      </div>

      {(isExpanded || isHovered || isMobileOpen) && (
        <div className="mt-auto pb-5">
          <SidebarWidget />
        </div>
      )}
    </aside>
  );
};

export default AppSidebar;