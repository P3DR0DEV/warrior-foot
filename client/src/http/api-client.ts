'use server'

import ky, { type KyRequest } from 'ky'
import { cookies } from 'next/headers'

async function getTokenOnCookie(request: KyRequest) {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`)
  }
}

export const warriorfootApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [getTokenOnCookie],
  },
})
