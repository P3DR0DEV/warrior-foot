import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { type LeagueUserProps, LeagueUsers } from '#domain/warrior-foot/enterprise/entities/league-users.ts'

export function makeLeagueUser(override: Partial<LeagueUserProps> = {}, id?: UniqueEntityId) {
  const leagueUser = LeagueUsers.create(
    {
      leagueId: new UniqueEntityId(),
      userId: new UniqueEntityId(),
      role: 'guest',
      ...override,
    },
    id,
  )

  return leagueUser
}
