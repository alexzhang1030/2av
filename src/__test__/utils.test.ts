import { isValidNumber } from '@/utils'

test('isValidNumber', () => {
  const testCases = [
    [1, true],
    [0, true],
    [null, false],
    [undefined, false],
    ['1', false],
    [false, false],
  ]
  for (const [value, expected] of testCases)
    expect(isValidNumber(value)).toBe(expected)
})
