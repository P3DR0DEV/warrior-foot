import z from "zod";
import { inviteFriends } from "@/http/leagues/invite-friends";

const inviteFriendsSchema = z.object({
  name: z.string().min(3, { message: "Insira o seu nome completo" }),
  email: z.email({ message: "Email inválido" }),
});

export async function inviteFriendsAction(data: FormData) {
  const validationResult = inviteFriendsSchema.safeParse(Object.fromEntries(data));

  if (!validationResult.success) {
    const errors = z.treeifyError(validationResult.error);

    return {
      success: false,
      message: null,
      validationErrors: errors.properties,
    };
  }

  const { name, email } = validationResult.data;

  const result = await inviteFriends({ name, email });

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
