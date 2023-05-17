import { z } from 'zod'
import { parse } from '..'

test('z.object', () => {
  const rule = z.object({
    bar: z.number(),
    foo: z.object({
      bar: z.string(),
    }),
  })
  expect(parse(rule)).toMatchInlineSnapshot(`
    {
      "bar": {
        "required": true,
        "type": "number",
      },
      "foo": {
        "fields": {
          "bar": {
            "required": true,
            "type": "string",
          },
        },
        "required": true,
        "type": "object",
      },
    }
  `)
})
