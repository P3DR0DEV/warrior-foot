import { ResourceNotFound } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { Team } from '#domain/warrior-foot/enterprise/entities/team.ts'
import type { ResourceNotFoundError } from '#infra/http/util/errors.ts'
import { generateRandomName } from '../../../../../util/generate-random-player-name.ts'
import { getRandomValue } from '../../../../../util/player-ability-values.ts'
import type { Player, PlayersRepository } from '../../repositories/players-repository.ts'
import type { TeamsRepository } from '../../repositories/teams-repository.ts'
import { CreatePlayerUseCase } from '../player/create.ts'

type TeamWithPlayers = {
  id: Team['id']
  name: Team['name']
  division: Team['division']
  leagueId: Team['leagueId']
  primaryColor: Team['primaryColor']
  secondaryColor: Team['secondaryColor']
  players: Player[]
}

type GetTeamByIdUseCaseResponse = Either<ResourceNotFoundError, { team: TeamWithPlayers }>

export class GetTeamByIdUseCase {
  private readonly teamsRepository: TeamsRepository
  private readonly playersRepository: PlayersRepository

  constructor(teamsRepository: TeamsRepository, playersRepository: PlayersRepository) {
    this.teamsRepository = teamsRepository
    this.playersRepository = playersRepository
  }

  async execute({ id }: { id: string }): Promise<GetTeamByIdUseCaseResponse> {
    const team = await this.teamsRepository.findById(id)

    if (!team) {
      return failure(ResourceNotFound('The team referenced by the id was not found'))
    }


    const players = await this.ensurePlayersExist(team.id.toValue(), team.division)

    return success({ team: {
      id: team.id,
      name: team.name,
      division: team.division,
      leagueId: team.leagueId,
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      players,
    } })
  }

  private async ensurePlayersExist(teamId: string, division: Team['division']): Promise<Player[]> {
    const existingPlayers = await this.playersRepository.findByTeamId(teamId)

    if (existingPlayers.length > 0) {
      return existingPlayers
    }
    
    const players: Player[] = []

    const divisionMapper = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
    } as const

    const maxPlayersPerDivisionMapper: { [k: number]: [number, number] } = {
      1: [18, 22],
      2: [16, 18],
      3: [12, 16],
      4: [11, 12]
    }

    const currentTeamDivision = divisionMapper[division]
    const maxPlayersPerDivision = maxPlayersPerDivisionMapper[currentTeamDivision]

    const numberOfPlayers = getRandomValue(maxPlayersPerDivision)

    const createPlayersUseCase = new CreatePlayerUseCase(this.playersRepository, this.teamsRepository)

    for (let i = 0; i < numberOfPlayers; i++) {
      
      const result = await createPlayersUseCase.execute({
        name: generateRandomName(), 
        teamId,
        position: 'outfield',
      })

      if (result.isFailure()) {
        throw new Error('Error creating player')
      }

      const { player } = result.value

      players.push(player)
    }

    return players
  }
}
