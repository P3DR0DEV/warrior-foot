import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CacheRepository } from "@/infra/cache/redis-cache-repository";

export default async function AuthRequiredLayout() {
  const cookie = await cookies();

  const token = cookie.get("token");

  if (!token) {
    redirect("/sign-in");
  }

  const decodedToken = jwtDecode<{ userId: string }>(token.value);

  const session = CacheRepository.get(`user-session:${decodedToken.userId}`);

  if (!session) {
    redirect("/sign-in");
  }
}
