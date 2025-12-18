import type { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { Team } from '#domain/warrior-foot/enterprise/entities/team.ts'
import { generateRandomName } from '../../../../../util/generate-random-player-name.ts'
import { generateRandomTeamName } from '../../../../../util/generate-random-team-name.ts'
import { getRandomValue } from '../../../../../util/player-ability-values.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'
import type { Player, PlayersRepository } from '../../repositories/players-repository.ts'
import type { TeamsRepository } from '../../repositories/teams-repository.ts'
import { CreatePlayerUseCase } from '../player/create.ts'
import { CreateTeamUseCase } from '../team/create.ts'

export type LeagueWithTeams = {
  id: UniqueEntityId
  name: string
  code: string
  userId: UniqueEntityId
  teams: Team[]
}

type Division = 'A' | 'B' | 'C' | 'D'

type GetLeagueByIdUseCaseResponse = Either<ResourceNotFoundError, { league: LeagueWithTeams }>

export class GetLeagueByIdUseCase {
  private readonly leaguesRepository: LeaguesRepository
  private readonly teamsRepository: TeamsRepository
  private readonly playersRepository: PlayersRepository

  constructor(
    leaguesRepository: LeaguesRepository,
    teamsRepository: TeamsRepository,
    playersRepository: PlayersRepository,
  ) {
    this.leaguesRepository = leaguesRepository
    this.teamsRepository = teamsRepository
    this.playersRepository = playersRepository
  }

  async execute({ leagueId }: { leagueId: string }): Promise<GetLeagueByIdUseCaseResponse> {
    const league = await this.leaguesRepository.findById(leagueId)

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

    const teams = await this.generateInitialTeams(leagueId)

    return teams
  }

  private async generateInitialTeams(leagueId: string): Promise<Team[]> {
    const divisions = ['A', 'B', 'C', 'D'] as const
    const teamsPerDivision = 8

    const teams: Team[] = []
    let nameIndex = 0
    const createTeamUseCase = new CreateTeamUseCase(this.teamsRepository, this.leaguesRepository)

    for(let i = 0; i < divisions.length; i++) {
      const division = divisions[i]
      for (let i = 0; i < teamsPerDivision; i++) {
        const teamName = generateRandomTeamName(nameIndex)

        const result = await createTeamUseCase.execute({
          name: teamName,
          division,
          leagueId,
          primaryColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          secondaryColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        })

        if (result.isFailure()) {
          throw new Error('Error creating team')
        }

        const { team } = result.value

        await this.generatePlayersPerTeam(team.id.toValue(), team.division)

        teams.push(team)
        nameIndex++
      }
    }

    return teams
  }

  private async generatePlayersPerTeam(teamId: string, division: Division): Promise<Player[]> {
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

    const maxGoalkeepersPerDivisionMapper: { [k: number]: [number, number] } = {
      1: [1, 2],
      2: [1, 2],
      3: [1, 1],
      4: [1, 1]
    }

    const currentTeamDivision = divisionMapper[division]
    const maxPlayersPerDivision = maxPlayersPerDivisionMapper[currentTeamDivision]
    const maxGoalkeepersPerDivision = maxGoalkeepersPerDivisionMapper[currentTeamDivision]

    const numberOfPlayers = getRandomValue(maxPlayersPerDivision)
    const numberOfGoalkeepers = getRandomValue(maxGoalkeepersPerDivision)
    const numberOfOutfielders = numberOfPlayers - numberOfGoalkeepers

    const createPlayersUseCase = new CreatePlayerUseCase(this.playersRepository, this.teamsRepository)

    for (let i = 0; i < numberOfOutfielders; i++) {
      
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

    for (let i = 0; i < numberOfGoalkeepers; i++) {
      const result = await createPlayersUseCase.execute({
        name: generateRandomName(),
        teamId,
        position: 'goalkeeper',
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
