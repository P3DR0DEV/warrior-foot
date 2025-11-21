"use server";

import { cookies } from "next/headers";
import { CacheRepository } from "../cache/redis-cache-repository";

export async function logout() {
  const nextCookie = await cookies();
  const userId = nextCookie.get("userId")?.value;

  await CacheRepository.delete(`user-session:${userId}`);

  nextCookie.delete("token");
  nextCookie.delete("userId");

  console.log(userId);
}
