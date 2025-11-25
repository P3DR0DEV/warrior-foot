import { eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { UsersRepository } from '#domain/warrior-foot/application/repositories/users-repository.ts'
import type { User } from '#domain/warrior-foot/enterprise/entities/user.ts'
import { users } from '#infra/database/schemas/users.ts'
import { DrizzleUsersMapper } from '../mappers/drizzle-users-mapper.ts'

export class DrizzleUsersRepository implements UsersRepository {
  private drizzle: NodePgDatabase

  constructor(drizzle: NodePgDatabase) {
    this.drizzle = drizzle
  }

  async findById(id: string): Promise<User | null> {
    const response = await this.drizzle.select().from(users).where(eq(users.id, id))

    if (response.length === 0) {
      return null
    }

    const user = response[0]

    return DrizzleUsersMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const response = await this.drizzle.select().from(users).where(eq(users.email, email))

    if (response.length === 0) {
      return null
    }

    const user = response[0]

    return DrizzleUsersMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = DrizzleUsersMapper.toPersistence(user)

    await this.drizzle.insert(users).values(data)
  }
}
