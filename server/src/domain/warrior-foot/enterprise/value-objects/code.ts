export class Code {
  private readonly value: string

  constructor(value: string) {
    this.value = value
  }

  toValue() {
    return this.value
  }

  static create(existing?: string) {
    const code = new Code(existing ?? Math.random().toString(36).substring(2, 15))
    
    return code
  }
}