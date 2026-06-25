import { useState } from "react";
import { useNavigate } from "react-router"; 
import { useAuth } from "../../context/AuthContext"; 
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const { refreshUser } = useAuth(); 
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = "http://localhost:8000/login"; 
      
      const formData = new URLSearchParams();
      formData.append("username", email); 
      formData.append("password", password);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", 
        },
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Credenciales incorrectas");
      }

      await refreshUser();
      navigate("/");

    } catch {
      setError("Ocurrió un error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Removido flex-1 de aquí para que herede la flexibilidad del layout de forma natural
    <div className="w-full flex justify-center items-center">
      
      {/* 
        CAMBIOS EN LAS CLASES DE ESTE DIV ENVOLVENTE:
        - Se eliminó 'flex-1' y 'justify-center' para que no se estire de arriba a abajo.
        - Se cambiaron los paddings a 'p-6 sm:p-8' para darle un respiro más elegante al contenido interior.
        - Se añadió una sombra sutil opcional con 'shadow-md' o 'dark:shadow-none' por si quieres darle relieve.
      */}
      <div className="w-full max-w-md mx-auto rounded-2xl bg-gray-50 p-6 sm:p-8 text-center dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.05]">
        
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md ">
            Iniciar Sesión
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ingresa tu correo electrónico y contraseña para iniciar sesión!
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="space-y-6 text-left"> {/* Añadido text-left para que los labels mantengan consistencia */}
            <div>
              <Label>
                Email <span className="text-error-500">*</span>
              </Label>
              <Input 
                type="email"
                placeholder="tucorreo@gmail.com" 
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label>
                Password <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </span>
              </div>
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Cargando..." : "Ingresar"}
            </Button>
          </div>
        </form>

        {/* Línea divisoria estética sutil opcional antes de la sección de soporte */}
        <hr className="border-gray-200 dark:border-white/[0.08] mb-6" />

        <div className="mx-auto w-full max-w-xs">
          <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
            ¿Tienes dudas o necesitas ayuda para ingresar?
          </h3>
          
          <a
            href="mailto:comitefuentesderucalhuedos@gmail.com"
            rel="nofollow"
            className="flex items-center justify-center p-2.5 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600 transition-colors"
          >
            Contactar
          </a>
        </div>
         
      </div>
    </div>
  );
}