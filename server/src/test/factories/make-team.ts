import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { Team, type TeamProps } from '#domain/warrior-foot/enterprise/entities/team.ts'

export function makeTeam(override: Partial<TeamProps> = {}, id?: UniqueEntityId) {
  const team = Team.create(
    {
      name: faker.company.name(),
      leagueId: new UniqueEntityId(),
      primaryColor: faker.color.rgb(),
      secondaryColor: faker.color.rgb(),
      division: faker.helpers.arrayElement(['A', 'B', 'C', 'D']),
      ...override,
    },
    id,
  )

  return team
}
