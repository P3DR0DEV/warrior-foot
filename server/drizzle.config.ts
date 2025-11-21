import { defineConfig } from 'drizzle-kit'
import { env } from '#infra/env/index.ts'

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: './drizzle',
  schema: './src/infra/database/schemas',
})
