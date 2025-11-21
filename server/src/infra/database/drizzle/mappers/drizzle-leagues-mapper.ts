import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { League } from '#domain/warrior-foot/enterprise/entities/league.ts'
import { Code } from '#domain/warrior-foot/enterprise/value-objects/code.ts'

type RawValue = {
  id: string
  name: string
  code: string
  userId: string
  createdAt: Date
}

export class DrizzleLeaguesMapper {
  static toDomain(raw: RawValue): League {
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

  static toPersistence(league: League) {
    return {
      id: league.id.toValue(),
      name: league.name,
      code: league.code,
      userId: league.userId.toValue(),
    }
  }
}
