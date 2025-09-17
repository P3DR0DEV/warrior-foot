import { PrismaClient } from '#prisma/index.js'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

function generateDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please set DATABASE_URL env variable')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

const schemaId = randomUUID()
const databaseUrl = generateDatabaseUrl(schemaId)

// Cria um cliente temporário para limpar o schema
const tempPrisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
})

// Limpa o schema antes de configurar os testes
await tempPrisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
await tempPrisma.$executeRawUnsafe(`CREATE SCHEMA "${schemaId}"`)
await tempPrisma.$disconnect()

// Agora configura a URL do banco para o schema limpo
process.env.DATABASE_URL = databaseUrl

// Aplica as migrações no schema limpo
execSync('pnpx prisma db push', { stdio: 'inherit' })

// Cliente final para os testes
const prisma = new PrismaClient({
  datasourceUrl: databaseUrl,
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})