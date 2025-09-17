import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { League, type LeagueProps } from '#domain/warrior-foot/enterprise/entities/league.ts'
import { PrismaLeaguesMapper } from '#infra/database/prisma/mappers/prisma-leagues-mapper.ts'
import type { PrismaClient } from '#prisma/index.js'

export function makeLeague(override: Partial<LeagueProps> = {}, id?: UniqueEntityId) {
  const league = League.create(
    {
      name: faker.company.name(),
      userId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return league
}

export class LeagueFactory {
  constructor(private prisma: PrismaClient) {}

  async createLeague(data: Partial<LeagueProps> = {}) {
    const league = makeLeague(data)

    await this.prisma.league.create({
      data: PrismaLeaguesMapper.toPersistence(league),
    })

    return league
  }
}
