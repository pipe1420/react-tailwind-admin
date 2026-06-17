import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Registrate | Fuentes de Rucalhue 2"
        description="Esta página permite a los usuarios registrarse en el sistema, proporcionando sus datos personales y de contacto para crear una cuenta. Facilita el proceso de registro para que los residentes puedan acceder a las funcionalidades y servicios disponibles en la plataforma de Fuentes de Rucalhue 2."
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
