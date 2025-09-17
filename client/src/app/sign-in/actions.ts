"use server";

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

  await CacheRepository.set(
    `user-session:${result.data.userId}`,
    result.data.token,
  );

  return {
    success: true,
    message: null,
    validationErrors: null,
  };
}
