export interface EmailProviderRepository {
  sendEmail({ email, name, inviter }: { email: string, name: string, inviter: string }): Promise<{ message: string }>
}