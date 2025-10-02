import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { LeagueUsers } from '#domain/warrior-foot/enterprise/entities/league-users.ts'
import type { Prisma, LeagueUsers as PrismaLeagueUsers } from '#prisma/index.d.ts'

export class PrismaLeagueUsersMapper {
  static toDomain(raw: PrismaLeagueUsers): LeagueUsers {
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

  static toPersistence(leagueUsers: LeagueUsers): Prisma.LeagueUsersUncheckedCreateInput {
    return {
      id: leagueUsers.id.toValue(),
      leagueId: leagueUsers.leagueId.toValue(),
      userId: leagueUsers.userId.toValue(),
      role: leagueUsers.role,
    }
  }
}
