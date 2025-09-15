import { faker } from '@faker-js/faker'
import type { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { User, type UserProps } from '#domain/warrior-foot/enterprise/entities/user.ts'

export function makeUser(override: Partial<UserProps> = {}, id?: UniqueEntityId) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return user
}
