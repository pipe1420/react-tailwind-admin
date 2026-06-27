import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Link } from "react-router"; 
import { useAuth } from "../../context/AuthContext";

// Usamos la interfaz de propiedades que definiste arriba
interface DropdownProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export default function UserDropdown({ isOpen, setOpen }: DropdownProps) {
  const { user, logout } = useAuth();

  // Sincroniza las acciones con el estado del Header padre
  function toggleDropdown() {
    setOpen(!isOpen);
  }

  function closeDropdown() {
    setOpen(false);
  }

  const handleLogout = () => {
    closeDropdown(); 
    logout(); 
  };

  if (!user) {
    return (
      <Link to="/signin" className="text-sm font-medium text-gray-700 dark:text-gray-400 hover:underline">
        Iniciar Sesión
      </Link>
    );
  }
  
  const getInitials = (name: string) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return words[0][0].toUpperCase();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11 flex items-center justify-center">
          {user.avatar && user.avatar !== "/images/user/default-avatar.jpg" ? (
            <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full font-semibold text-white bg-blue-600 dark:bg-blue-500 text-theme-sm uppercase">
              {getInitials(user.name)}
            </div>
          )}
        </span>

        <span className="block mr-1 font-medium text-theme-sm">{user.name}</span>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user.name}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user.email}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Editar Perfil
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Soporte
            </DropdownItem>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          Cerrar sesión
        </button>
      </Dropdown>
    </div>
  );
}