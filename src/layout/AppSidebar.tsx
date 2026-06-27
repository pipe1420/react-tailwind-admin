import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

// Assume these icons are imported from an icon library
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


const ResidentItems: NavItem[] = [
  {
    name: "Inicio", 
    code: "dashboard",
    icon: <GridIcon />,
    path: "/",
  },
  { 
    name: "Accesos", 
    code: "access", 
    icon: <PageIcon />,
    path: "/access",
    new: true,
  },
  {
    name: "Visitas", 
    code: "visits",
    icon: <PageIcon />,
    path: "/visits",
    pro: false,
  },
  {
    name: "Residentes", 
    code: "residents",
    icon: <CalenderIcon />,
    path: "/residents",
    pro: false,
  },
  {
    name: "Vehículos", 
    code: "vehicles",
    icon: <CalenderIcon />,
    path: "/vehicles",
    pro: false,
  },
  {
    name: "Historial", 
    icon: <ListIcon />,
    path: "/history",
    code: "history",
    pro: false,
    new: true,
  },
  {
    name: "Usuarios", 
    code: "users",
    icon: <BoxCubeIcon/>,
    path: "/users",
    pro: false,
    new: true,
  },
  {
    name: "Reportes", 
    code: "reports",
    icon: <PieChartIcon />,
    path: "/reports",
    pro: false,
  },
  {
    name: "Configuración", 
    code: "settings",
    icon: <PlugInIcon />,
    path: "/config",
    pro: false,
  },
];

const DevItems: NavItem[] = [ 
  {
    icon: <PlugInIcon />,
    name: "Conexiones",
    path: "/conections",
  },
  {
    icon: <DocsIcon />,
    name: "Logs",
    path: "/logs",
  },
  {
    icon: <ListIcon />,
    name: "Diagnostico",
    path: "/diagnostic",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();

  // 1. Tu Set optimizado adaptado al nuevo formato del backend (Mantenlo igual)
  const allowedMenus = useMemo(() => {
    // 1. Buscamos en la raíz (array plano) o en el objeto estructurado
    const rawPermissions = 
      user?.permissions || 
      user?.role_object?.permissions || 
      user?.role?.permissions || 
      [];
    
    // Imprime esto para verificar por cuál de las opciones entra y qué estructura tiene
    console.log("Evaluando permisos en Sidebar:", rawPermissions);

    return new Set<string>(
      rawPermissions
        .map((p: any) => {
          if (typeof p === "string") return p; // Si ya es un array plano de códigos ("dashboard", "visits")
          if (p && typeof p === "object" && !p.is_disabled) return p.code; // Si viene como objeto y NO está deshabilitado
          return null;
        })
        .filter((code): code is string => typeof code === "string")
    );
  }, [user]);
    
  // 2. CORREGIDO: Eliminamos el "|| item.name === 'Historial'"
  const filteredResidentItems = useMemo(() => {
    return ResidentItems.filter(item => 
      item.code && allowedMenus.has(item.code)
    );
  }, [allowedMenus]);

  console.log(filteredResidentItems)

  // 3. Memorizamos los ítems de desarrollo
  const filteredDevItems = useMemo(() => {
    const isDev = user?.role === "dev";
    return isDev ? DevItems : [];
  }, [user?.role]);


   const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );


  const renderBadge = (isItemActive: boolean, label: "Nuevo" | "Muy pronto") => (
    <span
      className={`ml-auto ${
        isItemActive ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"
      } menu-dropdown-badge`}
    >
      {label}
    </span>
  );

  // 3. Efecto único corregido usando las listas dinámicas filtradas
  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? filteredResidentItems : filteredDevItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
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
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
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
              >
                {/* Espacio para mapear sub-elementos si fuesen necesarios en el futuro */}
              </div>
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
              <img
                className="dark:hidden"
                src="/images/logo/logo-ciss.svg"
                alt="Logo"
                width={80}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-ciss.svg"
                alt="Logo"
                width={80}
                height={40}

              />
              <p className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
                Fuentes de Rucalhue 2
              </p>
            </>
          ) : (
            <img
              src="/images/logo/logo-ciss.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

        {/* Navegación y Menús */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar flex-grow">
        <nav className="mb-6">
          <div className="sidebar-container flex flex-col">
            {/* Menú Principal */}
            {renderMenuItems(filteredResidentItems, "main")}
            
            {/* Menú de Desarrollo */}
            {filteredDevItems.length > 0 && (
              <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                <p className={`text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 ${!isExpanded && !isHovered ? "text-center" : "px-3"}`}>
                  {isExpanded || isHovered || isMobileOpen ? "Desarrollo" : "Dev"}
                </p>
                {renderMenuItems(filteredDevItems, "others")}
              </div>
            )}
          </div>
        </nav>
      </div>

       {/* Widget del Sidebar en la parte inferior */}
      {(isExpanded || isHovered || isMobileOpen) && (
        <div className="mt-auto pb-5">
          <SidebarWidget />
        </div>
      )}

    </aside>
  );
};

export default AppSidebar;
