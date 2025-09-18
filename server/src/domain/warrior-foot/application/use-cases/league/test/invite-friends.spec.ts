import { UniqueEntityId } from "#core/entities/unique-entity-id.ts"
import { NodemailerRepository } from "#infra/lib/nodemailer.ts"
import { makeLeague } from "#test/factories/make-league.ts"
import { makeUser } from "#test/factories/make-user.ts"
import { InMemoryLeaguesRepository } from "#test/repositories/in-memo-leagues-repository.ts"
import { InMemoryUsersRepository } from "#test/repositories/in-memo-users-repository.ts"
import { InviteFriendsUseCase } from "../invite-friends.ts"

let leaguesRepository: InMemoryLeaguesRepository
let emailProvider: NodemailerRepository
let usersRepository: InMemoryUsersRepository
let sut: InviteFriendsUseCase

describe('Invite Friends Use Case', () => {
  beforeEach(() => {
    leaguesRepository = new InMemoryLeaguesRepository()
    emailProvider = new NodemailerRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new InviteFriendsUseCase(leaguesRepository, emailProvider)
  })

  it('should return a success response', async () => {
    const user = await makeUser()
    await usersRepository.create(user)

    const league = makeLeague({
      userId: user.id,
    })
    await leaguesRepository.create(league)

    const response = await sut.execute({
      leagueId: league.id.toString(),
      email: 'pedro.mendesctt@gmail.com',
      name: 'Pedro Mendes',
      inviter: 'Warrior Foot',
    })

    expect(response.isSuccess()).toBe(true)

    if (response.isSuccess()) {
      const { message } = response.value
      expect(message).toBe('Email sent successfully')
    }
  })

  it('should return a failure response if the league is not found', async () => {
    const user = await makeUser()
    await usersRepository.create(user)

    const response = await sut.execute({
      leagueId: new UniqueEntityId().toString(),
      email: 'pedro@mendes.com',
      name: 'Pedro Mendes',
      inviter: 'Warrior Foot',
    })

    expect(response.isFailure()).toBe(true)

    if (response.isFailure()) {
      const { name, message } = response.reason
      expect(name).toBe('ResourceNotFoundError')
      expect(message).toBe('The league referenced by the user was not found')
    }
  })
})