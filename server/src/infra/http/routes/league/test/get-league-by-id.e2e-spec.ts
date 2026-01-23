import supertest from 'supertest'
import { app } from '#infra/http/app-test.ts'
import { db } from '#infra/lib/drizzle.ts'
import { makeAuthenticatedUser } from '#test/factories/make-authenticated-user.ts'
import { LeagueFactory } from '#test/factories/make-league.ts'
import { UserFactory } from '#test/factories/make-user.ts'

describe('Test Get League By Id (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a league', async () => {
    const userFactory = new UserFactory(db)
    const user = await userFactory.createUser()

    const leagueFactory = new LeagueFactory(db)
    const league = await leagueFactory.createLeague({ userId: user.id })

    const { token } = await makeAuthenticatedUser({ user })

    const response = await supertest(app.server).get(`/leagues/${league.id}`).set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)

    const { league: leagueFromResponse } = response.body

    expect(leagueFromResponse).toMatchObject({
      id: league.id.toString(),
      name: league.name,
      code: league.code,
      userId: user.id.toString(),
      teams: expect.any(Array),
    })

    expect(leagueFromResponse.teams).toHaveLength(32)
  })
})
