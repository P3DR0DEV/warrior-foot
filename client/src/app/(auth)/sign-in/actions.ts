"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { z } from "zod";
import { signIn } from "@/http/auth/sign-in";
import { CacheRepository } from "@/infra/cache/redis-cache-repository";

const signInSchema = z.object({
  email: z.email({ message: "Email inválido" }),
  password: z.string(),
});

export async function signInAction(data: FormData) {
  const validationResult = signInSchema.safeParse(Object.fromEntries(data));

  if (!validationResult.success) {
    const errors = z.treeifyError(validationResult.error);

    return {
      success: false,
      message: null,
      validationErrors: errors.properties,
    };
  }

  const { email, password } = validationResult.data;

  const result = await signIn({ email, password });

  if (!result.success) {
    return {
      success: false,
      message: result.message,
      validationErrors: null,
    };
  }

  const payload = jwtDecode<{ userId: string }>(result.data.token);

  const cookie = await cookies()

  cookie.set("userId", payload.userId, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
  });

  await CacheRepository.set(
    `user-session:${payload.userId}`,
    JSON.stringify(payload),
  );

  return {
    success: true,
    message: null,
    validationErrors: null,
  };
}
