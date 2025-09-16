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

export const errors = {
  ResourceNotFoundError,
  AlreadyRegisteredEmailError,
}