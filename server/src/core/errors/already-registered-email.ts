export interface AlreadyRegisteredEmailError {
  name: 'EmailAlreadyRegisteredError'
  message: string
}

export function AlreadyRegisteredEmail(message = 'Email already registered'): AlreadyRegisteredEmailError {
  return {
    name: 'EmailAlreadyRegisteredError',
    message,
  }
}