import supertest from 'supertest'
import { app } from '#infra/http/app.ts'
import { prisma } from '#infra/lib/prisma.ts'
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
    const userFactory = new UserFactory(prisma)
    const user = await userFactory.createUser()

    const leagueFactory = new LeagueFactory(prisma)

    for (let i = 0; i < 3; i++) {
      await leagueFactory.createLeague({ userId: user.id })
    }

    const response = await supertest(app.server).get(`/leagues/${user.id}/leagues`)

    expect(response.statusCode).toEqual(200)

    expect(response.body.leagues).toHaveLength(3)
  })
})
