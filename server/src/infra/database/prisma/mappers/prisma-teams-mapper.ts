import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { Team } from '#domain/warrior-foot/enterprise/entities/team.ts'
import type { Prisma, Team as PrismaTeam } from '#prisma/index.js'

export class PrismaTeamsMapper {
  static toDomain(raw: PrismaTeam): Team {
    const leagueId = new UniqueEntityId(raw.leagueId)

    return Team.create({
      name: raw.name,
      primaryColor: raw.primaryColor,
      secondaryColor: raw.secondaryColor,
      division: raw.division,
      leagueId,
      createdAt: raw.createdAt,
    },
    new UniqueEntityId(raw.id),
  )
  }

  static toPersistence(team: Team): Prisma.TeamUncheckedCreateInput {
    return {
      id: team.id.toValue(),
      name: team.name,
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      division: team.division,
      leagueId: team.leagueId.toValue(),
    }
  }
}
