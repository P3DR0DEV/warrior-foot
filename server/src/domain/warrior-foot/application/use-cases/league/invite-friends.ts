import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import type { EmailProviderRepository } from '../../repositories/email-provider-repository.ts'
import type { LeaguesRepository } from '../../repositories/leagues-repository.ts'

interface InviteFriendsUseCaseProps {
  leagueId: string
  email: string
  inviter: string
  name: string
}

type InviteFriendsUseCaseResponse = Either<ResourceNotFoundError | Error, { message: string }>

export class InviteFriendsUseCase {
  private readonly repository: LeaguesRepository
  private readonly emailProvider: EmailProviderRepository

  constructor(repository: LeaguesRepository, emailProvider: EmailProviderRepository) {
    this.repository = repository
    this.emailProvider = emailProvider
  }

  async execute({ leagueId, email, inviter, name }: InviteFriendsUseCaseProps): Promise<InviteFriendsUseCaseResponse> {
    const league = await this.repository.findById(leagueId)

    if (!league) {
      return failure(ResourceNotFound('The league referenced by the user was not found'))
    }

    try {      
      await this.emailProvider.sendEmail({ email, name, inviter })
    } catch (error) {
      return failure(new Error('Error sending email', { cause: error }))
    }

    return success({ message: 'Email sent successfully' })
  }
}
