"use server";

import ky, { type KyRequest } from "ky";
import { cookies } from "next/headers";
import { env } from "@/env";

async function getTokenOnCookie(request: KyRequest) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
}

export const warriorfootApi = ky.create({
  prefixUrl: env.API_URL,
  hooks: {
    beforeRequest: [getTokenOnCookie],
  },
});
