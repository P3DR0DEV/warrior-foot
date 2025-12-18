import { makeLeague } from "#test/factories/make-league.ts"
import { makeTeam } from "#test/factories/make-team.ts"
import { makeUser } from "#test/factories/make-user.ts"
import { InMemoryLeaguesRepository } from "#test/repositories/in-memo-leagues-repository.ts"
import { InMemoryPlayersRepository } from "#test/repositories/in-memo-players-repository.ts"
import { InMemoryTeamsRepository } from "#test/repositories/in-memo-teams-repository.ts"
import { InMemoryUsersRepository } from "#test/repositories/in-memo-users-repository.ts"
import { GetTeamByIdUseCase } from "../get-team-by-id.ts"

let teamsRepository: InMemoryTeamsRepository
let playersRepository: InMemoryPlayersRepository
let usersRepository: InMemoryUsersRepository
let leaguesRepository: InMemoryLeaguesRepository
let sut: GetTeamByIdUseCase

describe('Get Team By Id Use Case', () => {
  beforeAll(() => {
    teamsRepository = new InMemoryTeamsRepository()
    playersRepository = new InMemoryPlayersRepository()
    usersRepository = new InMemoryUsersRepository()
    leaguesRepository = new InMemoryLeaguesRepository()
    sut = new GetTeamByIdUseCase(teamsRepository, playersRepository)
  })

  it('should return success response', async () => {
    const user = await makeUser()
    await usersRepository.create(user)

    const league = makeLeague({
      userId: user.id,
    })
    await leaguesRepository.create(league)

    const team = makeTeam({
      leagueId: league.id,
      division: 'A',
    })
    await teamsRepository.create(team)

    const response = await sut.execute({
      id: team.id.toString(),
    })

    expect(response.isSuccess()).toBe(true)

    if (response.isSuccess()) {
      const { team: foundTeam } = response.value

      expect(foundTeam.id).toBe(team.id)
      expect(foundTeam.name).toBe(team.name)
      expect(foundTeam.division).toBe(team.division)
      expect(foundTeam.leagueId.toValue()).toBe(league.id.toValue())
      expect(foundTeam.primaryColor).toBe(team.primaryColor)
      expect(foundTeam.secondaryColor).toBe(team.secondaryColor)
      expect(foundTeam.players.length).greaterThanOrEqual(18).lessThanOrEqual(22)
    }
  })
})