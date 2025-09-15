export interface ResourceNotFoundError {
  name: 'ResourceNotFoundError'
  message: string
}

export function ResourceNotFound(message = 'The resource was not found'): ResourceNotFoundError {
  return {
    name: 'ResourceNotFoundError',
    message,
  }
}