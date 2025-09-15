import type { User } from "#domain/warrior-foot/enterprise/entities/user.ts"

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>

  create(user: User): Promise<void>
}