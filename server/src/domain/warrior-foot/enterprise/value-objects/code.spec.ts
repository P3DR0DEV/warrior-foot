import { Code } from './code'

describe('Code value object', () => {
  it('should create a code', () => {
    const code = Code.create()

    expect(code.toValue()).toBeDefined()
  })
})
