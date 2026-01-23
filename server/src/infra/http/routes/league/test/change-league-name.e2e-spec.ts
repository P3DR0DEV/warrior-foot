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

    const league = await leagueFactory.createLeague({ userId: user.id })

    const { token } = await makeAuthenticatedUser({ user })

    const response = await supertest(app.server).patch(`/leagues/${league.id}/change-name`).set('Authorization', `Bearer ${token}`).send({
      name: 'New League Name',
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body.message).toBe('League name changed successfully')
  })

  it('should return a Unauthorized error', async () => {
    const userFactory = new UserFactory(db)
    const user = await userFactory.createUser()

    const leagueFactory = new LeagueFactory(db)
    const league = await leagueFactory.createLeague({ userId: user.id })

    const newUser = await userFactory.createUser()

    const { token } = await makeAuthenticatedUser({ user: newUser })

    const response = await supertest(app.server).patch(`/leagues/${league.id}/change-name`).set('Authorization', `Bearer ${token}`).send({
      name: 'New League Name',
    })

    expect(response.statusCode).toEqual(401)
  })
})
