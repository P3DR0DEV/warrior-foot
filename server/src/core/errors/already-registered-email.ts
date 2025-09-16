export interface AlreadyRegisteredEmailError {
  name: 'AlreadyRegisteredEmailError'
  message: string
}

export function AlreadyRegisteredEmail(message = 'Email already registered'): AlreadyRegisteredEmailError {
  return {
    name: 'AlreadyRegisteredEmailError',
    message,
  }
}
