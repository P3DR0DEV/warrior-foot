import supertest from 'supertest'
import { app } from '#infra/http/app-test.ts'
import { db } from '#infra/lib/drizzle.ts'
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

    const league = await leagueFactory.createLeague({ userId: user.id })

    const response = await supertest(app.server).patch(`/leagues/${league.id}/change-name`).send({
      name: 'New League Name',
    })

    expect(response.statusCode).toEqual(200)

    expect(response.body.message).toBe('League name changed successfully')
  })
})
