export interface EmailProviderRepository {
  sendEmail({ email, name, inviter, code }: { email: string, name: string, inviter: string, code: string }): Promise<{ message: string }>
}