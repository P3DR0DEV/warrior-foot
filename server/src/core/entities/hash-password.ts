import { compare, genSalt, hash } from 'bcryptjs'

export class HashPassword {
  readonly value: string

  constructor(value: string) {
    this.value = value
  }

  static async generateHash(value: string): Promise<string> {
    const password = await hash(value, await genSalt())

    return new HashPassword(password).value
  }

  static async compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash)
  }
}
