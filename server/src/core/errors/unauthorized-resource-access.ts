export interface UnauthorizedResourceAccessError {
  name: 'UnauthorizedResourceAccessError'
  message: string
}

export function UnauthorizedResourceAccess(message = 'The user is not authorized to access the resource'): UnauthorizedResourceAccessError {
  return {
    name: 'UnauthorizedResourceAccessError',
    message,
  }
}
