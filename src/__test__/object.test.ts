import { z } from 'zod'
import { inTestScope } from './fixtures/util'

test('z.object', () => {
  const rule = z.object({
    bar: z.number(),
    foo: z.object({
      bar: z.string(),
    }),
  })
  inTestScope(rule, { bar: '1', foo: { bar: 1 } }, (avRules, errors) => {
    expect(avRules).toMatchInlineSnapshot(`
      {
        "bar": [
          {
            "required": true,
          },
          {
            "type": "number",
          },
        ],
        "foo": [
          {
            "required": true,
          },
          {
            "fields": {
              "bar": [
                {
                  "required": true,
                },
                {
                  "type": "string",
                },
              ],
            },
            "type": "object",
          },
        ],
      }
    `)
    expect(errors).toMatchInlineSnapshot(`
      [
        {
          "field": "bar",
          "fieldValue": "1",
          "message": "bar is not a number",
        },
        {
          "field": "foo.bar",
          "fieldValue": 1,
          "message": "foo.bar is not a string",
        },
        {
          "field": "foo.bar",
          "fieldValue": 1,
          "message": "foo.bar is not a string",
        },
      ]
    `)
  })
})
