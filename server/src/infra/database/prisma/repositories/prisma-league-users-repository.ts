import type { LeagueUsersRepository } from "#domain/warrior-foot/application/repositories/league-users-repository.ts";
import type { LeagueUsers } from "#domain/warrior-foot/enterprise/entities/league-users.ts";
import type { PrismaClient } from "#prisma/index.js";
import { PrismaLeagueUsersMapper } from "../mappers/prisma-league-users-mapper.ts";

export class PrismaLeagueUsersRepository implements LeagueUsersRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(leagueUser: LeagueUsers): Promise<void> {
    const data = PrismaLeagueUsersMapper.toPersistence(leagueUser)

    await this.prisma.leagueUsers.create({
      data,
    })
  }
}