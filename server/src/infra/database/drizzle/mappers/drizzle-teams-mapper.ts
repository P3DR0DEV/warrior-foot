import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { Team } from '#domain/warrior-foot/enterprise/entities/team.ts'

type RawValue = {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  division: 'A' | 'B' | 'C' | 'D'
  leagueId: string
  createdAt: Date
}

export class DrizzleTeamsMapper {
  static toDomain(raw: RawValue): Team {
    const leagueId = new UniqueEntityId(raw.leagueId)

    return Team.create(
      {
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

  static toPersistence(team: Team) {
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
