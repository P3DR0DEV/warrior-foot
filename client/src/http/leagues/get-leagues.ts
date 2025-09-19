"use server";

import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { warriorfootApi } from "../api-client";

interface GetLeaguesResponse {
  id: string;
  name: string;
  code: string;
  userId: string;
}

type GetLeaguesResult =
  | {
      success: true;
      data: { leagues: GetLeaguesResponse[] };
    }
  | {
      success: false;
      message: string;
      validationErrors: null;
    };

export async function getLeagues(): Promise<GetLeaguesResult> {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    const response = await warriorfootApi.get(`leagues/${userId}/leagues`).json<{ leagues: GetLeaguesResponse[] }>();

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
