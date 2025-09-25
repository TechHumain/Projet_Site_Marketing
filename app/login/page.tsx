import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LoginButtons from "@/app/login/login-buttons";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="container">
      <h1>Connexion</h1>
      <p>Sélectionnez un fournisseur pour vous connecter.</p>
      <LoginButtons />
    </div>
  );
}
