import { z } from 'zod'
import { inTestScope } from './fixtures/util'

test('custom message', () => {
  const rule = z.object({
    name: z.string({
      required_error: 'name 必填',
    }),
  })
  inTestScope(rule, { }, (avRules, errors) => {
    expect(avRules).toMatchInlineSnapshot(`
      {
        "name": {
          "message": "name 必填",
          "required": true,
          "type": "string",
        },
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
