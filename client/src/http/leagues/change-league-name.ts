"use server";

import { HTTPError } from "ky";
import { warriorfootApi } from "../api-client";

interface ChangeLeagueNameResponse {
  message: string;
}

type ChangeLeagueNameResult =
  | {
      success: true;
      data: { league: ChangeLeagueNameResponse };
    }
  | {
      success: false;
      message: string;
      validationErrors: null;
    };

interface ChangeLeagueNameProps {
  leagueId: string;
  name: string;
}

export async function changeLeagueName({ leagueId, name }: ChangeLeagueNameProps): Promise<ChangeLeagueNameResult> {
  try {
    const response = await warriorfootApi
      .patch(`leagues/${leagueId}/change-name`, {
        json: { name },
      })
      .json<{ league: ChangeLeagueNameResponse }>();

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      const apiError = await error.response.json<{ message: string }>();

      const message = apiError.message;

      return { success: false, message, validationErrors: null };
    }

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      validationErrors: null,
    };
  }
}
