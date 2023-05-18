import { z } from 'zod'
import { inTestScope } from './fixtures/util'

test('ranger check', () => {
  const rule = z.object({
    foo1: z.string().min(2).max(4),
    foo2: z.string().min(2),
    foo3: z.string().max(4),
  })
  inTestScope(rule,
    { foo1: 'very very long', foo2: '1', foo3: 'very very long' },
    (avRules, errors) => {
      expect(avRules).toMatchInlineSnapshot(`
      {
        "foo1": {
          "max": 4,
          "min": 2,
          "required": true,
          "type": "string",
        },
        "foo2": {
          "min": 2,
          "required": true,
          "type": "string",
        },
        "foo3": {
          "max": 4,
          "required": true,
          "type": "string",
        },
      }
    `)
      expect(errors).toMatchInlineSnapshot(`
        [
          {
            "field": "foo1",
            "fieldValue": "very very long",
            "message": "foo1 must be between 2 and 4 characters",
          },
          {
            "field": "foo2",
            "fieldValue": "1",
            "message": "foo2 must be at least 2 characters",
          },
          {
            "field": "foo3",
            "fieldValue": "very very long",
            "message": "foo3 cannot be longer than 4 characters",
          },
        ]
      `)
    })
})
