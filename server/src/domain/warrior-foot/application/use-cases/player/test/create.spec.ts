import { UniqueEntityId } from "#core/entities/unique-entity-id.ts"
import { Goalkeeper } from "#domain/warrior-foot/enterprise/entities/goalkeeper.ts"
import { Outfield } from "#domain/warrior-foot/enterprise/entities/outfield.ts"
import { makeLeague } from "#test/factories/make-league.ts"
import { makeTeam } from "#test/factories/make-team.ts"
import { InMemoryLeaguesRepository } from "#test/repositories/in-memo-leagues-repository.ts"
import { InMemoryPlayersRepository } from "#test/repositories/in-memo-players-repository.ts"
import { InMemoryTeamsRepository } from "#test/repositories/in-memo-teams-repository.ts"
import { CreatePlayerUseCase } from "../create.ts"

let teamsRepository: InMemoryTeamsRepository
let leaguesRepository: InMemoryLeaguesRepository
let playersRepository: InMemoryPlayersRepository
let sut: CreatePlayerUseCase

describe('Create Player Use Case', () => {
  beforeEach(() => {
    teamsRepository = new InMemoryTeamsRepository()
    leaguesRepository = new InMemoryLeaguesRepository()
    playersRepository = new InMemoryPlayersRepository()
    sut = new CreatePlayerUseCase(playersRepository, teamsRepository)
  })

  it('should return a success response (Outfield)', async () => {
    const league = makeLeague()
    await leaguesRepository.create(league)

    const team = makeTeam({ leagueId: league.id })
    await teamsRepository.create(team)
    
    const response = await sut.execute({
      name: 'Player 1',
      strength: 10,
      agility: 10,
      energy: 10,
      teamId: team.id.toString(),
      kick: 10,
      longKick: 10,
      pass: 10,
      longPass: 10,
      isStar: true,
      position: 'outfield',
      dribble: 10,
    })

    expect(response.isSuccess()).toBe(true)

    if (response.isSuccess()) {
      const { player } = response.value

      expect(player).toBeInstanceOf(Outfield)
      if (player instanceof Outfield) {
        expect(player.name).toBe('Player 1')
        expect(player.strength).toBe(10)
        expect(player.agility).toBe(10)
        expect(player.energy).toBe(10)
        expect(player.teamId.toValue()).toBe(team.id.toValue())
        expect(player.kick).toBe(10)
        expect(player.longKick).toBe(10)
        expect(player.pass).toBe(10)
        expect(player.longPass).toBe(10)
        expect(player.isStar).toBe(true)
        expect(player.position).toBe('outfield')
        expect(player.dribble).toBe(10)
        expect(player.id).toBeInstanceOf(UniqueEntityId)
      }
    }
  })

  it('should return a success response (Outfield)', async () => {
    const league = makeLeague()
    const team = makeTeam({ leagueId: league.id })
    await leaguesRepository.create(league)
    await teamsRepository.create(team)

       
    const response = await sut.execute({
      name: 'Player 2',
      strength: 10,
      agility: 10,
      energy: 10,
      teamId: team.id.toString(),
      kick: 10,
      longKick: 10,
      pass: 10,
      longPass: 10,
      isStar: true,
      position: 'goalkeeper',
      jump: 10,
      reflexes: 10,
    })

    expect(response.isSuccess()).toBe(true)

    if (response.isSuccess()) {
      const { player } = response.value

      expect(player).toBeInstanceOf(Goalkeeper)
      if (player instanceof Goalkeeper) {
        expect(player.name).toBe('Player 2')
        expect(player.strength).toBe(10)
        expect(player.agility).toBe(10)
        expect(player.energy).toBe(10)
        expect(player.teamId.toValue()).toBe(team.id.toValue())
        expect(player.kick).toBe(10)
        expect(player.longKick).toBe(10)
        expect(player.pass).toBe(10)
        expect(player.longPass).toBe(10)
        expect(player.isStar).toBe(true)
        expect(player.position).toBe('goalkeeper')
        expect(player.jump).toBe(10)
        expect(player.reflexes).toBe(10)
        expect(player.id).toBeInstanceOf(UniqueEntityId)
      }
    }
  })

  it('should return a failure response if the league is not found', async () => {
  })
})