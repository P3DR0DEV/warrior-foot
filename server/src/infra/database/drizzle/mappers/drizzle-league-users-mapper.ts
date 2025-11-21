import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { LeagueUsers } from '#domain/warrior-foot/enterprise/entities/league-users.ts'

type RawValue = {
  id: string
  leagueId: string
  userId: string
  role: 'guest' | 'owner'
  createdAt: Date
}

export class DrizzleLeagueUsersMapper {
  static toDomain(raw: RawValue): LeagueUsers {
    return LeagueUsers.create(
      {
        leagueId: new UniqueEntityId(raw.leagueId),
        userId: new UniqueEntityId(raw.userId),
        role: raw.role,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(leagueUsers: LeagueUsers){
    return {
      id: leagueUsers.id.toValue(),
      leagueId: leagueUsers.leagueId.toValue(),
      userId: leagueUsers.userId.toValue(),
      role: leagueUsers.role,
    }
  }
}
