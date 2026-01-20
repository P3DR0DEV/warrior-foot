import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { Match } from '#domain/warrior-foot/enterprise/entities/match.ts'

export function makeMatch(overrides?: Partial<Match>, id?: UniqueEntityId): Match {
  const match = Match.create({
    round: 1,
    homeTeamId: new UniqueEntityId(),
    awayTeamId: new UniqueEntityId(),
    scheduleId: new UniqueEntityId(),
    ...overrides
  },
    id
  )

  return match
}
