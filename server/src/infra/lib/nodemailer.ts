import { createTransport } from 'nodemailer'
import type { EmailProviderRepository } from '#domain/warrior-foot/application/repositories/email-provider-repository.ts'
import { env } from '#infra/env/index.ts'

export const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
})

export class NodemailerRepository implements EmailProviderRepository {
  async sendEmail({
    name,
    email,
    inviter,
    code,
  }: {
    name: string
    email: string
    inviter: string
    code: string
  }): Promise<{ message: string }> {
    const info = await transporter.sendMail({
      from: `Warrior Foot <${env.EMAIL_USER}>`,
      to: email,
      subject: 'Warrior Foot Invitation',
      html: `<b>
      Olá, ${name}!<br/>
      ${inviter} está te convidando para juntar-se a ele no WARRIORFOOT.<br/><br/>
      <a href="${env.CLIENT_URL}/invite/${code}?name=${name}">Clique aqui</a> para aceitar o convite.
      <small>Este convite expira em 72 horas.</small>
      </b>`,
    })

    if (info.rejected.length > 0) {
      throw new Error(info.rejected[0].toString())
    }

    return { message: info.messageId }
  }
}
