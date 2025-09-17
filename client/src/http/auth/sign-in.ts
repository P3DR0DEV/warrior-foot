import { HTTPError } from "ky"
import { warriorfootApi } from "../api-client"

interface SignIn {
  email: string
  password: string
}

interface SignInResponse {
  userId: string
  token: string
}

type SignInResult =
  | {
      success: true
      data: SignInResponse
    }
  | {
      success: false
      message: string
      validationErrors: null
    }

export async function signIn(data: SignIn): Promise<SignInResult> {
  try {
    const response = await warriorfootApi.post('auth/sign-in', {
      json: data,
    }).json<SignInResponse>()

    return {
      success: true,
      data: response,
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      const apiError = await error.response.json<{ message: string }>()

      const message = apiError.message

      return { success: false, message, validationErrors: null }
    }

    return { success: false, message: 'Unexpected error, try again in a few minutes.', validationErrors: null }
  }
}