import 'fastify'

type TokenPayload = {
  id: string
  name: string
  email: string
}

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUser: () => Promise<TokenPayload>
  }
}
