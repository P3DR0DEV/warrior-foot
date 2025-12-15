import supertest from 'supertest'
import { app } from '#infra/http/app-test.ts'
import { db } from '#infra/lib/drizzle.ts'
import { LeagueFactory } from '#test/factories/make-league.ts'
import { UserFactory } from '#test/factories/make-user.ts'

describe('Test Get Team By Id (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a team', async () => {
    // create a new user
    const userFactory = new UserFactory(db)
    const user = await userFactory.createUser()

    const leagueFactory = new LeagueFactory(db)
    const league = await leagueFactory.createLeague({ userId: user.id })

    const getLeagueByIdResponse = await supertest(app.server).get(`/leagues/${league.id}`)

    expect(getLeagueByIdResponse.statusCode).toEqual(200)

    const { league: leagueFromResponse } = getLeagueByIdResponse.body

    const response = await supertest(app.server).get(`/teams/${leagueFromResponse.teams[0].id}`)

    expect(response.statusCode).toEqual(200)

    const { team: teamFromResponse } = response.body

    expect(teamFromResponse).toMatchObject({
      id: teamFromResponse.id,
      name: teamFromResponse.name,
      division: teamFromResponse.division,
      leagueId: teamFromResponse.leagueId,
      primaryColor: teamFromResponse.primaryColor,
      secondaryColor: teamFromResponse.secondaryColor,
      players: expect.any(Array),
    })

    expect(teamFromResponse.players).greaterThanOrEqual(11).lessThanOrEqual(22)
  })
})
