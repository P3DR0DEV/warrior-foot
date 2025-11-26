"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import z from "zod";
import { acceptInvite } from "@/http/leagues/accept-invite";
import { CacheRepository } from "@/infra/cache/redis-cache-repository";

type VerifyIfUserIsLoggedInResult =
  | {
    isLoggedIn: true;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
  | {
    isLoggedIn: false;
    user: null;
  };

export async function verifyIfUserIsLoggedIn(): Promise<VerifyIfUserIsLoggedInResult> {
  const cookie = await cookies();

  const token = cookie.get("token");

  if (!token) {
    return {
      isLoggedIn: false,
      user: null,
    };
  }

  const { user } = jwtDecode<{ user: { id: string; name: string; email: string } }>(token.value);

  const session = await CacheRepository.get(`user-session:${user.id}`);

  if (!session) {
    return {
      isLoggedIn: false,
      user: null,
    };
  }

  return {
    isLoggedIn: true,
    user,
  };
}

const acceptInviteSchema = z.object({
  userId: z.uuid({ message: "ID do usuário inválido" }),
  code: z.string().min(3, { message: "Código de convite inválido" }),
});

export async function acceptInviteAction(data: FormData) {
  const validationResult = acceptInviteSchema.safeParse(Object.fromEntries(data));

  if (!validationResult.success) {
    const errors = z.treeifyError(validationResult.error);

    return {
      success: false,
      message: null,
      validationErrors: errors.properties,
    };
  }

  const { userId, code } = validationResult.data;

  const result = await acceptInvite({ code, userId });

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
  };
}
