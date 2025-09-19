'use server'
import { HTTPError } from "ky";
import { warriorfootApi } from "../api-client";

interface InviteFriends {
  name: string;
  email: string;
}

interface InviteFriendsResponse {
  message: string;
}

type InviteFriendsResult =
  | {
      success: true;
      data: InviteFriendsResponse;
    }
  | {
      success: false;
      message: string;
      validationErrors: null;
    };

export async function inviteFriends(data: InviteFriends): Promise<InviteFriendsResult> {
  try {
    const response = await warriorfootApi
      .post("leagues/invite", {
        json: data,
      })
      .json<InviteFriendsResponse>();

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

    console.log(error);

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      validationErrors: null,
    };
  }
}
