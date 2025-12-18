import request from 'supertest'
import { app } from '#infra/http/app-test.ts'

describe('Create User (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app.server).post('/users/').send({
      name: 'John Doe',
      email: 'email@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body.token).toBeTruthy()
  })
})
