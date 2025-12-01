import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import { Goalkeeper } from '#domain/warrior-foot/enterprise/entities/goalkeeper.ts'
import { Outfield } from '#domain/warrior-foot/enterprise/entities/outfield.ts'
import type { PlayerProps } from '#domain/warrior-foot/enterprise/entities/player.ts'
import type { Player, PlayersRepository } from '../../repositories/players-repository.ts'
import type { TeamsRepository } from '../../repositories/teams-repository.ts'

interface CreateGoalkeeperInput extends PlayerProps {
  position: 'goalkeeper'
  jump: number
  reflexes: number
  teamId: string
}

interface CreateOutfieldInput extends PlayerProps {
  position: 'outfield'
  dribble: number
  teamId: string
}

type CreatePlayerRequest = CreateGoalkeeperInput | CreateOutfieldInput

type CreatePlayerResponse = Either<ResourceNotFoundError, { player: Player }>

export class CreatePlayerUseCase {
  constructor(
    private readonly repository: PlayersRepository,
    private readonly teamsRepository: TeamsRepository,
  ) { }

  async execute(props: CreatePlayerRequest): Promise<CreatePlayerResponse> {
    let player: Goalkeeper | Outfield

    const team = await this.teamsRepository.findById(props.teamId)

    if (!team) {
      return failure(ResourceNotFound('The league referenced was not found'))
    }

    const teamId = new UniqueEntityId(props.teamId)
    if (props.position === 'goalkeeper') {
      player = Goalkeeper.create({
        position: props.position,
        name: props.name,
        strength: props.strength,
        agility: props.agility,
        energy: props.energy,
        teamId,
        kick: props.kick,
        longKick: props.longKick,
        pass: props.pass,
        longPass: props.longPass,
        isStar: props.isStar,
        jump: props.jump,
        reflexes: props.reflexes,
      })
    } else {
      player = Outfield.create({
        name: props.name,
        strength: props.strength,
        agility: props.agility,
        energy: props.energy,
        teamId,
        kick: props.kick,
        longKick: props.longKick,
        pass: props.pass,
        longPass: props.longPass,
        isStar: props.isStar,
        position: props.position,
        dribble: props.dribble,
      })
    }

    await this.repository.create(player)

    return success({ player })
  }
}
