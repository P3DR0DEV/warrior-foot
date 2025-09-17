import { faker } from '@faker-js/faker'
import { HashPassword } from '#core/entities/hash-password.ts'
import type { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { User, type UserProps } from '#domain/warrior-foot/enterprise/entities/user.ts'
import { PrismaUsersMapper } from '#infra/database/prisma/mappers/prisma-users-mapper.ts'
import type { PrismaClient } from '#prisma/index.js'

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
  constructor(private prisma: PrismaClient) {}

  async createUser(data: Partial<UserProps> = {}) {
    const user = await makeUser(data)

    await this.prisma.user.create({
      data: PrismaUsersMapper.toPersistence(user),
    })

    return user
  }
}
