import { ResourceNotFound } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { Team } from '#domain/warrior-foot/enterprise/entities/team.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'
import type { TeamsRepository } from '../../repositories/teams-repository.ts'

interface InitiateSeasonUseCaseRequest {
  leagueId: string
}

type InitiateSeasonUseCaseResponse = Either<Error, string>

export class InitiateSeasonUseCase {
  private readonly leagueRepository: LeaguesRepository
  private readonly teamsRepository: TeamsRepository

  constructor(leagueRepository: LeaguesRepository, teamsRepository: TeamsRepository) {
    this.leagueRepository = leagueRepository
    this.teamsRepository = teamsRepository
  }

  async execute({ leagueId }: InitiateSeasonUseCaseRequest): Promise<InitiateSeasonUseCaseResponse> {
    const league = await this.leagueRepository.findById(leagueId)

    if (!league) {
      return failure(ResourceNotFound('The league referenced by the user was not found'))
    }

    const teams = await this.teamsRepository.findByLeagueId(leagueId)

    if (teams.length === 0) {
      return failure(ResourceNotFound('There are no teams in the league'))
    }

    type Division = 'A' | 'B' | 'C' | 'D'

    const teamsPerDivision: Record<Division, Team[]> = {
      A: [],
      B: [],
      C: [],
      D: [],
    }

    for (const team of teams) {
      teamsPerDivision[team.division].push(team)
    }

    Object.keys(teamsPerDivision).forEach((division) => {
      const schedules = this.generateSchedule(teamsPerDivision[division as Division])

      if (division === 'A') {
        schedules.forEach(schedule  => {
          console.table({
            round: schedule.round,
            matches: schedule.matches
          })
        })
      }
    })

    return success('ok')
  }

  protected generateSchedule(teams: Team[]) {
    const totalTeams = teams.length

    // Cria a primeira parte da tabela de jogos, que terá totalTeams / 2 jogos de ida
    const firstRunSchedule = []
    // Cria a segunda parte da tabela de jogos, que terá totalTeams / 2 jogos de volta
    const secondRunSchedule = []

    const teamsForSchedule = [...teams]

    const rounds = totalTeams - 1

    for (let round = 0; round < rounds; round++) {
      const firstRunMatches = []
      const secondRunMatches = []

      for (let i = 0; i < totalTeams / 2; i++) {
        // primeiro time da lista
        const home = teamsForSchedule[i]

        // ultimo time da lista
        const away = teamsForSchedule[totalTeams - 1 - i]

        // Salva o jogo de ida (home vs away)
        firstRunMatches.push({
          home: home,
          away: away,
        })

        // Salva o jogo de volta (away vs home) simultaneamente, evitando repetição
        secondRunMatches.push({
          home: away,
          away: home,
        })
      }

      // Adiciona os jogos das rodadas
      firstRunSchedule.push({
        round: round + 1,
        matches: firstRunMatches,
      })

      // Adiciona os jogos das rodadas de volta
      secondRunSchedule.push({
        round: totalTeams + round,
        matches: secondRunMatches,
      })

      // Rotação dos times mantendo o primeiro time sempre fixo e rotacionando o ultimo time para a posição de segundo time
      const temp = teamsForSchedule[totalTeams - 1]
      for (let i = totalTeams - 1; i > 1; i--) {
        teamsForSchedule[i] = teamsForSchedule[i - 1]
      }
      teamsForSchedule[1] = temp
    }

    const schedule = [...firstRunSchedule, ...secondRunSchedule]

    return schedule
  }
}
