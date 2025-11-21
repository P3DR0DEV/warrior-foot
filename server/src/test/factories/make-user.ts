import { faker } from '@faker-js/faker'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { HashPassword } from '#core/entities/hash-password.ts'
import type { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { User, type UserProps } from '#domain/warrior-foot/enterprise/entities/user.ts'
import { DrizzleUsersMapper } from '#infra/database/drizzle/mappers/drizzle-users-mapper.ts'
import { users } from '#infra/database/schemas/users.ts'

export async function makeUser(override: Partial<UserProps> = {}, id?: UniqueEntityId) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      ...override,
      password: await HashPassword.generateHash(override.password ?? faker.internet.password()),
    },
    id,
  )

  return user
}

export class UserFactory {
  constructor(private drizzle: NodePgDatabase) {}

  async createUser(data: Partial<UserProps> = {}) {
    const user = await makeUser(data)

    await this.drizzle.insert(users).values(DrizzleUsersMapper.toPersistence(user))

    return user
  }
}
