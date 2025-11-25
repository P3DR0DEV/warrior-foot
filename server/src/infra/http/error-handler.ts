import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import {
  AlreadyRegisteredEmailError,
  InvalidCredentialsError,
  ResourceNotFoundError,
  UnauthorizedError,
} from './util/errors.ts'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _request, reply) => {
  console.error({ error })

  if (error instanceof ZodError) {
    return reply.status(400).send({
      name: error.name,
      message: `Error during Validation`,
      errors: error.flatten,
    })
  }

  if (error instanceof AlreadyRegisteredEmailError) {
    return reply.status(401).send({
      name: error.name,
      cause: error.cause,
      message: error.message,
    })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send({
      name: error.name,
      cause: error.cause,
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      name: error.name,
      cause: error.cause,
      message: error.message,
    })
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.status(401).send({
      name: error.name,
      cause: error.cause,
      message: error.message,
    })
  }
  // 500 - Internal Server Error
  return reply.status(500).send({
    message: 'Internal Server Error',
  })
}
