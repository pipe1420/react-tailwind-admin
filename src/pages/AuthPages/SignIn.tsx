import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Iniciar Sesión | Fuentes de Rucalhue 2"
        description="Esta página permite a los usuarios iniciar sesión en el sistema, proporcionando sus datos de acceso. Facilita el proceso de inicio de sesión para que los usuarios puedan acceder a las funcionalidades y servicios disponibles en la plataforma de Fuentes de Rucalhue 2."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
