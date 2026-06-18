import { useState } from "react";
import { useNavigate } from "react-router"; // O 'react-router-dom' según tu versión
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    // 1. URL limpia sin el prefijo /api
    const url = "http://localhost:8000/login"; 
    
    // 2. Construir los datos como Form Data utilizando URLSearchParams
    const formData = new URLSearchParams();
    formData.append("username", email); // FastAPI exige que el campo se llame 'username'
    formData.append("password", password);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        // Cabecera obligatoria para que FastAPI procese el formulario
        "Content-Type": "application/x-www-form-urlencoded", 
      },
      body: formData, // Pasamos el objeto de formulario estructurado
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Credenciales incorrectas");
    }

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      navigate("/"); 
    } else {
      throw new Error("El servidor no retornó un token de acceso válido.");
    }

  } catch (err: any) {
    setError(err.message || "Ocurrió un error al iniciar sesión");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
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

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Cargando..." : "Ingresar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
