"use server";

import { HTTPError } from "ky";
import { warriorfootApi } from "../api-client";

interface InitiateSeasonResponse {
  message: string;
}

type InitiateSeasonResult =
  | {
      success: true;
      data: { league: InitiateSeasonResponse };
    }
  | {
      success: false;
      message: string;
      validationErrors: null;
    };

interface InitiateSeasonProps {
  leagueId: string;
}

export async function initiateSeason({ leagueId }: InitiateSeasonProps): Promise<InitiateSeasonResult> {
  try {
    const response = await warriorfootApi
      .post(`leagues/${leagueId}/new-season`)
      .json<{ league: InitiateSeasonResponse }>();

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
