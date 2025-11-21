import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { User } from '#domain/warrior-foot/enterprise/entities/user.ts'

type RawValue = {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date | null
}

export class DrizzleUsersMapper {
  static toDomain(raw: RawValue): User {
    return User.create({
      name: raw.name,
      email: raw.email,
      password: raw.password,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    },
    new UniqueEntityId(raw.id),
  )
  }

  static toPersistence(user: User) {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email,
      password: user.password,
    }
  }
}
