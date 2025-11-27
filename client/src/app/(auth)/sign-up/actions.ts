"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { z } from "zod";
import { createUser } from "@/http/users/create-user";
import { CacheRepository } from "@/infra/cache/redis-cache-repository";

type UserForPayload = {
  id: string;
  name: string;
  email: string;
};

const createAccountSchema = z
  .object({
    name: z.string().min(3, { message: "Insira o seu nome completo" }),
    email: z.email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
    confirmPassword: z.string().min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
    invitedBy: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas digitadas não coincidem",
    path: ["confirmPassword"],
  });

export async function createAccountAction(data: FormData) {
  const validationResult = createAccountSchema.safeParse(Object.fromEntries(data));

  if (!validationResult.success) {
    const errors = z.treeifyError(validationResult.error);

    return {
      success: false,
      message: null,
      validationErrors: errors.properties,
    };
  }

  const { name, email, password, invitedBy } = validationResult.data;

  const result = await createUser({ name, email, password, invitedBy });

  if (!result.success) {
    return {
      success: false,
      message: result.message,
      validationErrors: null,
    };
  }

  const payload = jwtDecode<{ user: UserForPayload }>(result.data.token);

  const cookie = await cookies();

  cookie.set("userId", payload.user.id, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
  });

  cookie.set("token", result.data.token, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
  });

  await CacheRepository.set(`user-session:${payload.user.id}`, JSON.stringify(payload));

  return {
    success: true,
    message: null,
    validationErrors: null,
  };
}
