export interface InvalidCredentialsError {
  name: 'InvalidCredentialsError'
  message: string
}

export function InvalidCredentials(message = 'Email already registered'): InvalidCredentialsError {
  return {
    name: 'InvalidCredentialsError',
    message,
  }
}
