import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { User } from '#domain/warrior-foot/enterprise/entities/user.ts'
import type { Prisma, User as PrismaUser } from '#prisma/index.d.ts'

export class PrismaUsersMapper {
  static toDomain(raw: PrismaUser): User {
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

  static toPersistence(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email,
      password: user.password,
    }
  }
}
