"use server";

import { HTTPError } from "ky";
import { warriorfootApi } from "../api-client";

interface AcceptInviteResponse {
  message: string;
}

type AcceptInviteResult =
  | {
    success: true;
    data: { league: AcceptInviteResponse };
  }
  | {
    success: false;
    message: string;
    validationErrors: null;
  };

interface AcceptInviteProps {
  code: string;
  userId: string;
}

export async function acceptInvite({ code, userId }: AcceptInviteProps): Promise<AcceptInviteResult> {
  try {
    const response = await warriorfootApi.patch(`leagues/invite/${code}/accept`, {
      json: { userId },
    }).json<{ league: AcceptInviteResponse }>();

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
