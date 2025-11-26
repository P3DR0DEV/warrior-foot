import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CacheRepository } from "@/infra/cache/redis-cache-repository";
import { Navbar } from "./_components/navbar";

export default async function AuthRequiredLayout({ children }: { children: React.ReactNode }) {
  const cookie = await cookies();

  const token = cookie.get("token");

  if (!token) {
    redirect("/sign-in");
  }

  const decodedToken = jwtDecode<{ user: { id: string; name: string; email: string } }>(token.value);

  const session = await CacheRepository.get(`user-session:${decodedToken.user.id}`);

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
