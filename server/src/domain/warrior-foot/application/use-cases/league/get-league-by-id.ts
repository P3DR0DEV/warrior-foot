import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import { Team } from '#domain/warrior-foot/enterprise/entities/team.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'
import type { TeamsRepository } from '../../repositories/teams-repository.ts'

export type LeagueWithTeams = {
  id: UniqueEntityId
  name: string
  code: string
  userId: UniqueEntityId
  teams: Team[]
}

type GetLeagueByIdUseCaseResponse = Either<ResourceNotFoundError, { league: LeagueWithTeams }>

export class GetLeagueByIdUseCase {
  private readonly repository: LeaguesRepository
  private readonly teamsRepository: TeamsRepository

  constructor(repository: LeaguesRepository, teamsRepository: TeamsRepository) {
    this.repository = repository
    this.teamsRepository = teamsRepository
  }

  async execute({ leagueId }: { leagueId: string }): Promise<GetLeagueByIdUseCaseResponse> {
    const league = await this.repository.findById(leagueId)

    if (!league) {
      return failure(ResourceNotFound('The league referenced by the user was not found'))
    }

    const teams = await this.ensureTeamsExist(leagueId)

    const response = {
      id: league.id,
      name: league.name,
      code: league.code,
      userId: league.userId,
      teams,
    }
    return success({ league: response })
  }

  private async ensureTeamsExist(leagueId: string): Promise<Team[]> {
    const existingTeams = await this.teamsRepository.findByLeagueId(leagueId)

    if (existingTeams.length > 0) {
      return existingTeams
    }

    const teams = this.generateInitialTeams(leagueId)
    await this.teamsRepository.createMany(teams)

    return teams
  }

  private generateInitialTeams(leagueId: string): Team[] {
    const divisions = ['A', 'B', 'C', 'D'] as const
    const teamsPerDivision = 8
    const teamNames = [
      'Águias',
      'Leões',
      'Tigres',
      'Dragões',
      'Falcões',
      'Lobos',
      'Panthers',
      'Sharks',
      'Bulls',
      'Bears',
      'Eagles',
      'Lions',
      'Tigers',
      'Warriors',
      'Knights',
      'Spartans',
      'Phoenix',
      'Thunder',
      'Lightning',
      'Storm',
      'Flames',
      'Blaze',
      'Fire',
      'Ice',
      'Rangers',
      'Hunters',
      'Gladiators',
      'Champions',
      'Legends',
      'Heroes',
      'Titans',
      'Giants',
    ]

    const suffixes = ['FC', 'SC', 'EC', 'AC', 'United', 'City', 'Town', 'Club']
    const teams: Team[] = []
    let nameIndex = 0

    divisions.forEach((division) => {
      for (let i = 0; i < teamsPerDivision; i++) {
        const baseName = teamNames[nameIndex % teamNames.length]
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]

        const team = Team.create({
          name: `${baseName} ${suffix}`,
          division,
          leagueId: new UniqueEntityId(leagueId),
          primaryColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          secondaryColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        })

        teams.push(team)
        nameIndex++
      }
    })

    return teams
  }
}
