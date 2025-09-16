"use server";

import { z } from "zod";
import { createUser } from "@/http/users/create-user";

const createAccountSchema = z.object({
  name: z.string().min(3, { message: "Insira o seu nome completo" }),
  email: z.email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
});

export async function createAccountAction(data: FormData) {
  console.log(data);
  const validationResult = createAccountSchema.safeParse(
    Object.fromEntries(data),
  );

  if (!validationResult.success) {
    const errors = z.treeifyError(validationResult.error);

    return {
      success: false,
      message: null,
      validationErrors: errors.properties,
    };
  }

  const { name, email, password, confirmPassword } = validationResult.data;

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Senhas não coincidem",
      validationErrors: null,
    };
  }

  const result = await createUser({ name, email, password });

  if (!result.success) {
    return {
      success: false,
      message: result.message,
      validationErrors: null,
    };
  }

  return {
    success: true,
    message: null,
    validationErrors: null,
  }
}
