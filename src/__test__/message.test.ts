import { z } from 'zod'
import { inTestScope } from './fixtures/util'

test('custom message', () => {
  const rule = z.object({
    name: z.string({
      required_error: 'name 必填',
    }),
    age: z.number({
      required_error: 'age 必填',
    }).optional(),
  })
  inTestScope(rule, { age: 1 }, (avRules, errors) => {
    expect(avRules).toMatchInlineSnapshot(`
      {
        "age": [
          {
            "required": false,
            "type": "number",
          },
        ],
        "name": [
          {
            "message": "name 必填",
            "required": true,
            "type": "string",
          },
        ],
      }
    `)
    expect(errors).toMatchInlineSnapshot(`
      [
        {
          "field": "name",
          "fieldValue": undefined,
          "message": "name 必填",
        },
      ]
    `)
  })
})
