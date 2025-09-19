import type { TeamsRepository } from "#domain/warrior-foot/application/repositories/teams-repository.ts";
import type { Team } from "#domain/warrior-foot/enterprise/entities/team.ts";
import type { PrismaClient } from "#prisma/index.js";
import { PrismaTeamsMapper } from "../mappers/prisma-teams-mapper.ts";

export class PrismaTeamsRepository implements TeamsRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  
  async createMany(teams: Team[]): Promise<void> {
    const data = teams.map(PrismaTeamsMapper.toPersistence);

    await this.prisma.team.createMany({
      data,
    });
  }

  async findById(id: string): Promise<Team | null> {
    const team = await this.prisma.team.findUnique({
      where: {
        id,
      },
    });

    if (!team) {
      return null;
    }

    return PrismaTeamsMapper.toDomain(team);
  }

  async findByLeagueId(leagueId: string): Promise<Team[]> {
    const teams = await this.prisma.team.findMany({
      where: {
        leagueId,
      },
    });

    return teams.map(PrismaTeamsMapper.toDomain);
  }

  async create(team: Team): Promise<void> {
    const data = PrismaTeamsMapper.toPersistence(team);

    await this.prisma.team.create({
      data,
    });
  }
}