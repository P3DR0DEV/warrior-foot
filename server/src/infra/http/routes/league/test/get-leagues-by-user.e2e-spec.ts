import supertest from 'supertest'
import { app } from '#infra/http/app-test.ts'
import { db } from '#infra/lib/drizzle.ts'
import { makeAuthenticatedUser } from '#test/factories/make-authenticated-user.ts'
import { LeagueFactory } from '#test/factories/make-league.ts'
import { UserFactory } from '#test/factories/make-user.ts'

describe('Test Get Leagues By User (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a list of leagues', async () => {
    // create a new user
    const userFactory = new UserFactory(db)
    const user = await userFactory.createUser()

    const leagueFactory = new LeagueFactory(db)

    for (let i = 0; i < 3; i++) {
      await leagueFactory.createLeague({ userId: user.id })
    }

    const { token } = await makeAuthenticatedUser({ user })

    const response = await supertest(app.server)
      .get(`/leagues/${user.id}/leagues`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body.leagues).toHaveLength(3)
  })
})
