import request from 'supertest'
import { app } from './app-test.ts'

describe('Test Running Server', () => {
  test('(E2E) should return a 200 status code', async () => {
    await app.ready()

    const response = await request(app.server).get('/health')

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      name: 'WarriorFoot API',
      version: '1.0.0',
      description: 'WarriorFoot API',
      status: 'OK',
    })
  })
})