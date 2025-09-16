import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import { Team } from '#domain/warrior-foot/enterprise/entities/team.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'
import type { TeamsRepository } from '../../repositories/teams-repository.ts'

type Division = 'A' | 'B' | 'C' | 'D'

interface CreateTeamRequest {
  name: string
  primaryColor: string
  secondaryColor: string
  division: Division
  leagueId: string
}

type CreateTeamResponse = Either<ResourceNotFoundError, { team: Team }>

export class CreateTeamUseCase {
  constructor(
    private readonly repository: TeamsRepository,
    private readonly leaguesRepository: LeaguesRepository,
  ) {}

  async execute({
    name,
    primaryColor,
    secondaryColor,
    division,
    leagueId,
  }: CreateTeamRequest): Promise<CreateTeamResponse> {
    const league = await this.leaguesRepository.findById(leagueId)

    if (!league) {
      return failure(ResourceNotFound('The league referenced by the team was not found'))
    }

    const team = Team.create({
      name,
      primaryColor,
      secondaryColor,
      division,
      leagueId: new UniqueEntityId(leagueId),
    })

    await this.repository.create(team)

    return success({ team })
  }
}
