import { UniqueEntityId } from '#core/entities/unique-entity-id.ts'
import { ResourceNotFound, type ResourceNotFoundError } from '#core/errors/resource-not-found.ts'
import { type Either, failure, success } from '#core/types/either.ts'
import { Goalkeeper } from '#domain/warrior-foot/enterprise/entities/goalkeeper.ts'
import { Outfield } from '#domain/warrior-foot/enterprise/entities/outfield.ts'

import { getRandomValue, playerAbilityValues, rollChance } from '../../../../../util/player-ability-values.ts'
import { starPlayerAbilityValues } from '../../../../../util/star-player-ability-values.ts'
import type { Player, PlayersRepository } from '../../repositories/players-repository.ts'
import type { TeamsRepository } from '../../repositories/teams-repository.ts'

interface CreatePlayerRequest {
  name: string
  teamId: string
  position: 'goalkeeper' | 'outfield'
}

type CreatePlayerResponse = Either<ResourceNotFoundError, { player: Player }>

export class CreatePlayerUseCase {
  private readonly repository: PlayersRepository
  private readonly teamsRepository: TeamsRepository

  constructor(repository: PlayersRepository, teamsRepository: TeamsRepository) {
    this.repository = repository
    this.teamsRepository = teamsRepository
  }

  async execute(props: CreatePlayerRequest): Promise<CreatePlayerResponse> {
    const team = await this.teamsRepository.findById(props.teamId)

    if (!team) {
      return failure(ResourceNotFound('The league referenced was not found'))
    }

    const division = team.division

    const teamId = new UniqueEntityId(props.teamId)

    // Probabilidade de ser um craque, parâmetro divisão enviado para calcular a %
    const isStar = rollChance(division)

    let player: Goalkeeper | Outfield
    // Tentar refatorar esse bloco de código para que o código seja mais legível
    if (props.position === 'goalkeeper') {
      if (isStar) {
        //GOLEIRO CRAQUE
        const values = {
          strength: getRandomValue(starPlayerAbilityValues[division].natural.strength),
          agility: getRandomValue(starPlayerAbilityValues[division].natural.agility),
          energy: getRandomValue(starPlayerAbilityValues[division].natural.energy),
          kick: getRandomValue(starPlayerAbilityValues[division].goalkeeper.kick),
          longKick: getRandomValue(starPlayerAbilityValues[division].goalkeeper.longKick),
          pass: getRandomValue(starPlayerAbilityValues[division].goalkeeper.pass),
          longPass: getRandomValue(starPlayerAbilityValues[division].goalkeeper.longPass),
          jump: getRandomValue(starPlayerAbilityValues[division].goalkeeper.jump),
          reflexes: getRandomValue(starPlayerAbilityValues[division].goalkeeper.reflexes),
        }

        player = Goalkeeper.create({
          position: props.position,
          name: props.name,
          teamId,
          isStar,
          ...values,
        })
      } else {

        //GOLEIRO NÃO CRAQUE
        const values = {
          strength: getRandomValue(playerAbilityValues[division].natural.strength),
          agility: getRandomValue(playerAbilityValues[division].natural.agility),
          energy: getRandomValue(playerAbilityValues[division].natural.energy),
          kick: getRandomValue(playerAbilityValues[division].goalkeeper.kick),
          longKick: getRandomValue(playerAbilityValues[division].goalkeeper.longKick),
          pass: getRandomValue(playerAbilityValues[division].goalkeeper.pass),
          longPass: getRandomValue(playerAbilityValues[division].goalkeeper.longPass),
          jump: getRandomValue(playerAbilityValues[division].goalkeeper.jump),
          reflexes: getRandomValue(playerAbilityValues[division].goalkeeper.reflexes),
        }

        player = Goalkeeper.create({
          position: props.position,
          name: props.name,
          teamId,
          isStar,
          ...values,
        })
      }
    } else {
      if (isStar) {

        // JOGADOR DE LINHA CRAQUE
        const values = {
          strength: getRandomValue(starPlayerAbilityValues[division].natural.strength),
          agility: getRandomValue(starPlayerAbilityValues[division].natural.agility),
          energy: getRandomValue(starPlayerAbilityValues[division].natural.energy),
          kick: getRandomValue(starPlayerAbilityValues[division].outfield.kick),
          longKick: getRandomValue(starPlayerAbilityValues[division].outfield.longKick),
          pass: getRandomValue(starPlayerAbilityValues[division].outfield.pass),
          longPass: getRandomValue(starPlayerAbilityValues[division].outfield.longPass),
          dribble: getRandomValue(starPlayerAbilityValues[division].outfield.dribble),
        }

        player = Outfield.create({
          position: props.position,
          name: props.name,
          teamId,
          isStar,
          ...values,
        })
      } else {
        // JOGADOR DE LINHA NÃO CRAQUE
        const values = {
          strength: getRandomValue(playerAbilityValues[division].natural.strength),
          agility: getRandomValue(playerAbilityValues[division].natural.agility),
          energy: getRandomValue(playerAbilityValues[division].natural.energy),
          kick: getRandomValue(playerAbilityValues[division].outfield.kick),
          longKick: getRandomValue(playerAbilityValues[division].outfield.longKick),
          pass: getRandomValue(playerAbilityValues[division].outfield.pass),
          longPass: getRandomValue(playerAbilityValues[division].outfield.longPass),
          dribble: getRandomValue(playerAbilityValues[division].outfield.dribble),
        }

        player = Outfield.create({
          name: props.name,
          teamId,
          isStar,
          position: props.position,
          ...values,
        })
      }

    }
    await this.repository.create(player)

    return success({ player })
  }
}
