import { z } from 'zod'
import Schema from 'async-validator'
import { parse } from '..'

test('easy parse', () => {
  const rules = z.object({
    name: z.string(),
    age: z.number().optional(),
    locations: z.array(z.string()).optional(),
    birth: z.date().optional(),
    contact: z.object({
      name: z.string(),
      age: z.number().optional(),
    }),
  })

  const avRules = parse(rules)

  expect(avRules).toMatchInlineSnapshot(`
    {
      "age": {
        "required": false,
        "type": "number",
      },
      "birth": {
        "required": false,
        "type": "date",
      },
      "contact": {
        "fields": {
          "age": {
            "required": false,
            "type": "number",
          },
          "name": {
            "required": true,
            "type": "string",
          },
        },
        "required": true,
        "type": "object",
      },
      "locations": {
        "required": false,
        "type": "array",
      },
      "name": {
        "required": true,
        "type": "string",
      },
    }
  `)

  const validator = new Schema(avRules)

  validator.validate({ name: 'foo', age: '2' }, (errors) => {
    if (errors) {
      expect(errors).toMatchInlineSnapshot(`
        [
          {
            "field": "age",
            "fieldValue": "2",
            "message": "age is not a number",
          },
          {
            "field": "contact",
            "fieldValue": undefined,
            "message": "contact is required",
          },
        ]
      `)
    }
  })
})
