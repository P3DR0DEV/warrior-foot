import { HTTPError } from "ky";
import { warriorfootApi } from "../api-client";

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  id: string;
  name: string;
  email: string;
}

type CreateUserResult =
  | {
      success: true;
      data: CreateUserResponse;
    }
  | {
      success: false;
      message: string;
      validationErrors: null;
    };

export async function createUser(data: CreateUser): Promise<CreateUserResult> {
  try {
    const response = await warriorfootApi
      .post("users", {
        json: data,
      })
      .json<CreateUserResponse>();

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
