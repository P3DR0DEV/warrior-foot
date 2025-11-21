"use server";

import { HTTPError } from "ky";
import { warriorfootApi } from "../api-client";

interface GetLeagueByIdResponse {
  id: string;
  name: string;
  code: string;
  userId: string;
  teams: any[];
}

type GetLeaguesResult =
  | {
      success: true;
      data: { league: GetLeagueByIdResponse };
    }
  | {
      success: false;
      message: string;
      validationErrors: null;
    };

export async function getLeagueById(leagueId: string): Promise<GetLeaguesResult> {
  try {
    const response = await warriorfootApi.get(`leagues/${leagueId}`).json<{ league: GetLeagueByIdResponse }>();

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
