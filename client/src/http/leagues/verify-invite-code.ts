"use server";

import { HTTPError } from "ky";
import { warriorfootApi } from "../api-client";

interface VerifyInviteCodeResponse {
  name: string;
  email: string;
  inviter: {
    id: string;
    name: string;
  };
  code: string;
  created_at: Date;
}

type VerifyInviteCodeResult =
  | {
      success: true;
      data: { data: VerifyInviteCodeResponse };
    }
  | {
      success: false;
      message: string;
      validationErrors: null;
    };

export async function verifyInviteCode(code: string): Promise<VerifyInviteCodeResult> {
  try {
    const response = await warriorfootApi.get(`leagues/verify/${code}`).json<{ data: VerifyInviteCodeResponse }>();

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
