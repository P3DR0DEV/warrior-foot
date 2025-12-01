export interface PlayerProps {
  name: string
  strength: number
  agility: number
  energy: number
  teamId: string
  kick: number
  longKick: number
  pass: number
  longPass: number

  createdAt: Date
  updatedAt?: Date | null
}