import type { LeaguesRepository } from "#domain/warrior-foot/application/repositories/leagues-repository.ts";
import type { League } from "#domain/warrior-foot/enterprise/entities/league.ts";
import type { PrismaClient } from "#prisma/index.js";
import { PrismaLeaguesMapper } from "../mappers/prisma-leagues-mapper.ts";

export class PrismaLeaguesRepository implements LeaguesRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async findById(id: string): Promise<League | null> {
    const league = await this.prisma.league.findUnique({
      where: {
        id,
      },
    })

    if (!league) {
      return null
    }

    return PrismaLeaguesMapper.toDomain(league)
  }

  async findByUserId(userId: string): Promise<League[]> {
    const leagues = await this.prisma.league.findMany({
      where: {
        userId,
      },
    })

    return leagues.map(PrismaLeaguesMapper.toDomain)
  }

  async create(league: League): Promise<void> {
    const data = PrismaLeaguesMapper.toPersistence(league)

    await this.prisma.league.create({
      data,
    })
  }

  async findByCode(code: string): Promise<League | null> {
    const league = await this.prisma.league.findUnique({
      where: {
        code,
      },
    })

    if (!league) {
      return null
    }

    return PrismaLeaguesMapper.toDomain(league)
  }
}