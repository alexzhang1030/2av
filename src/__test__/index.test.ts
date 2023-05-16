import { z } from 'zod'
import type { Rules } from 'async-validator'
import { parse } from '..'

test('easy parse', () => {
  const rules = z.object({
    name: z.string(),
    age: z.number().optional(),
    locations: z.array(z.string()).optional(),
  })

  expect(parse(rules)).toStrictEqual({
    name: {
      type: 'string',
      required: true,
    },
    age: {
      type: 'number',
      required: false,
    },
    locations: {
      type: 'array',
      required: false,
    },
  } satisfies Rules)
})
