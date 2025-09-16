import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { League } from '#domain/warrior-foot/enterprise/entities/league.ts'
import { Code } from '#domain/warrior-foot/enterprise/value-objects/code.ts'
import type { Prisma, League as PrismaLeague } from '#prisma/index.d.ts'

export class PrismaLeaguesMapper {
  static toDomain(raw: PrismaLeague): League {
    const code = Code.create(raw.code) 

    return League.create({
      name: raw.name,
      code,
      userId: new UniqueEntityId(raw.userId),
      createdAt: raw.createdAt,
    },
    new UniqueEntityId(raw.id),
  )
  }

  static toPersistence(league: League): Prisma.LeagueUncheckedCreateInput {
    return {
      id: league.id.toValue(),
      name: league.name,
      code: league.code,
      userId: league.userId.toValue(),
    }
  }
}
