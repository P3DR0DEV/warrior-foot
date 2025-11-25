export class ResourceNotFoundError extends Error {
  constructor(message: string) {
    super(message, {
      cause: errors,
    })
    this.name = 'ResourceNotFoundError'
  }
}

export class AlreadyRegisteredEmailError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AlreadyRegisteredEmailError'
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidCredentialsError'
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message, {
      cause: errors,
    })
    this.name = 'UnauthorizedError'
  }
}

export const errors = {
  InvalidCredentialsError,
  ResourceNotFoundError,
  AlreadyRegisteredEmailError,
  UnauthorizedError,
}
