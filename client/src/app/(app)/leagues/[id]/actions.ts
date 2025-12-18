import z from "zod";
import { changeLeagueName } from "@/http/leagues/change-league-name";

const inviteFriendsSchema = z.object({
  name: z.string().min(3, { message: "O nome da liga deve ter pelo menos 3 caracteres" }),
  leagueId: z.uuid(),
});

export async function changeLeagueNameAction(data: FormData) {
  const validationResult = inviteFriendsSchema.safeParse(Object.fromEntries(data));

  if (!validationResult.success) {
    const errors = z.treeifyError(validationResult.error);

    return {
      success: false,
      message: null,
      validationErrors: errors.properties,
    };
  }

  const { name, leagueId } = validationResult.data;

  const result = await changeLeagueName({ name, leagueId });

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
