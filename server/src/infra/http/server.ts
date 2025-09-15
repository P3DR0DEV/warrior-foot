import { env } from '../env/index.ts'
import { app } from './app.ts'

app.listen({ port: env.PORT }).then((address) => {
  console.log(`[Server] HTTP Server running on ${address}`)
})