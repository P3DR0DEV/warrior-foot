import supertest from 'supertest'
import { app } from '#infra/http/app-test.ts'
import { db } from '#infra/lib/drizzle.ts'
import { UserFactory } from '#test/factories/make-user.ts'

describe('Sign In E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should sign in a user', async () => {
    const userFactory = new UserFactory(db)
    await userFactory.createUser({
      email: 'pedro@mendes.com',
      password: '123456',
    })

    const response = await supertest(app.server).post('/auth/sign-in').send({
      email: 'pedro@mendes.com',
      password: '123456',
    })

    expect(response.status).toBe(200)

    const { token } = response.body

    expect(token).toBeTruthy()
  })
})
