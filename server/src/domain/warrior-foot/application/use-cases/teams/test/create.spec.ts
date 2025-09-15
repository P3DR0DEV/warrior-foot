import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { makeLeague } from '#test/factories/make-league.ts'
import { InMemoryLeaguesRepository } from '#test/repositories/in-memo-leagues-repository.ts'
import { InMemoryTeamsRepository } from '#test/repositories/in-memo-teams-repository.ts'
import { CreateTeamUseCase } from '../create'

let teamsRepository: InMemoryTeamsRepository
let leaguesRepository: InMemoryLeaguesRepository
let sut: CreateTeamUseCase

describe('Create Team Use Case', () => {
  beforeEach(() => {
    teamsRepository = new InMemoryTeamsRepository()
    leaguesRepository = new InMemoryLeaguesRepository()
    sut = new CreateTeamUseCase(teamsRepository, leaguesRepository)
  })

  it('should return a success response', async () => {
    const league = makeLeague({})
    await leaguesRepository.create(league)

    const response = await sut.execute({
      name: 'Team 1',
      primaryColor: '#ff0000',
      secondaryColor: '#0000ff',
      division: 'A',
      leagueId: league.id,
    })

    expect(response.isSuccess()).toBe(true)

    if (response.isSuccess()) {
      const { team } = response.value

      expect(team.name).toBe('Team 1')
      expect(team.primaryColor).toBe('#ff0000')
      expect(team.secondaryColor).toBe('#0000ff')
      expect(team.division).toBe('A')
      expect(team.leagueId.toValue()).toBe(league.id.toValue())
      expect(team.id).toBeInstanceOf(UniqueEntityId)
    }
  })

  it('should return a failure response if league is not found', async () => {
    const response = await sut.execute({
      name: 'Team 1',
      primaryColor: '#ff0000',
      secondaryColor: '#0000ff',
      division: 'A',
      leagueId: new UniqueEntityId(),
    })

    expect(response.isFailure()).toBe(true)

    if (response.isFailure()) {
      const { name, message } = response.reason
      expect(name).toBe('ResourceNotFoundError')
      expect(message).toBe('The league referenced by the team was not found')
    }
  })
})
