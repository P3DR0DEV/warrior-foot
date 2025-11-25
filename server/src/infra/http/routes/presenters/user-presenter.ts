import type { User } from '#domain/warrior-foot/enterprise/entities/user.ts'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
    }
  }
}
