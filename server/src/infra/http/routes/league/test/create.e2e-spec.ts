import supertest from 'supertest'
import { app } from '#infra/http/app-test.ts'
import { db } from '#infra/lib/drizzle.ts'
import { UserFactory } from '#test/factories/make-user.ts'

describe('Test League Creation (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a new league', async () => {
    // create a new user
    const userFactory = new UserFactory(db)
    const user = await userFactory.createUser()

    const response = await supertest(app.server).post('/leagues/').send({
      name: 'my second league',
      userId: user.id.toString(),
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body.league).toMatchObject({
      id: expect.any(String),
      name: 'my second league',
      code: expect.any(String),
      userId: user.id.toString(),
    })
  })
})
