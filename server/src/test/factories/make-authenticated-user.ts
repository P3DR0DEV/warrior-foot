import type { User } from '#domain/warrior-foot/enterprise/entities/user.ts'
import { app } from '#infra/http/app-test.ts'

interface MakeAuthenticatedUserProps {
  user: User
}

export async function makeAuthenticatedUser({ user }: MakeAuthenticatedUserProps) {
  const userForPayload = {
    id: user.id.toValue(),
    name: user.name,
    email: user.email,
  }

  const token = app.jwt.sign(
    {
      user: userForPayload,
    },
    {
      expiresIn: '1d',
    },
  )

  return { token }
}
