import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { Match } from '#domain/warrior-foot/enterprise/entities/match.ts'

type RawValue = {
  id: string
  awayTeamId: string
  homeTeamId: string
  round: number
  scheduleId: string
  createdAt: Date,
}

export class DrizzleMatchesMapper {
  static toDomain(raw: RawValue): Match {
    return Match.create(
      {
        round: raw.round,
        homeTeamId: new UniqueEntityId(raw.homeTeamId),
        awayTeamId: new UniqueEntityId(raw.awayTeamId),
        scheduleId: new UniqueEntityId(raw.scheduleId),
        createdAt: raw.createdAt,
      }, 
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(match: Match) {
    return {
      id: match.id.toValue(),
      awayTeamId: match.away.toValue(),
      homeTeamId: match.home.toValue(),
      round: match.round,
      scheduleId: match.scheduleId.toValue(),
    }
  }
}
