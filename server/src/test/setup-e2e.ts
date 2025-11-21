import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'

let pool: Pool
let databaseForTest: ReturnType<typeof drizzle>
let databaseUrl: string | undefined

// Vitest entende que o SQL para fechar conexões é um erro não tratado e para não sujar mt o console foi adicionado o bloco abaixo
process.on('uncaughtException', (error) => {
  if (error.message.includes('terminating connection due to administrator command')) return
  throw error
})

function getWorker() {
  const workerId = process.env.VITEST_WORKER_ID ?? '1'
  return `test_${workerId}`
}

export async function setupDatabase() {
  const workerDb = getWorker()

  databaseUrl = process.env.DATABASE_URL?.replace(/(\w+)$/, '$1_test')

  const adminPool = new Pool({ connectionString: databaseUrl })
  const adminClient = await adminPool.connect()

  await adminClient.query(`DROP DATABASE IF EXISTS ${workerDb};`)
  await adminClient.query(`CREATE DATABASE ${workerDb};`)
  adminClient.release()
  await adminPool.end()

  process.env.DATABASE_URL = process.env.DATABASE_URL?.replace(/\/[^/]+$/, `/${workerDb}`)

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  databaseForTest = drizzle(pool)
  await migrate(databaseForTest, { migrationsFolder: './drizzle' })

  return { databaseForTest }
}

export async function cleanupDatabase() {
  const workerDb = getWorker()

  if (pool) {
    await pool.end()
  }

  const adminPool = new Pool({ connectionString: databaseUrl })
  const adminClient = await adminPool.connect()

  try {
    await adminClient.query(
      `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${workerDb}' AND pid <> pg_backend_pid();`,
    )

    await adminClient.query(`DROP DATABASE IF EXISTS "${workerDb}";`)
  } catch (error) {
    console.error(`Falha ao remover o banco de dados de teste "${workerDb}":`, error)
  } finally {
    adminClient.release()
    await adminPool.end()
  }
}

export { databaseForTest }