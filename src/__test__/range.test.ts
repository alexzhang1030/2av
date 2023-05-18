import { z } from 'zod'
import { inTestScope } from './fixtures/util'

test('range check', () => {
  const rule = z.object({
    foo1: z.string().min(2).max(4),
    foo2: z.string().min(2, 'foo2 的长度必须要大于 2 个字符'),
    foo3: z.string({
      required_error: 'foo3 必填',
    }).max(4),
  })
  inTestScope(rule,
    { foo1: 'very very long', foo2: '1', foo3: 'very very long' },
    (avRules, errors) => {
      expect(avRules).toMatchInlineSnapshot(`
        {
          "foo1": [
            {
              "required": true,
              "type": "string",
            },
            {
              "max": 4,
              "min": 2,
            },
          ],
          "foo2": [
            {
              "required": true,
              "type": "string",
            },
            {
              "min": 2,
            },
          ],
          "foo3": [
            {
              "message": "foo3 必填",
              "required": true,
              "type": "string",
            },
            {
              "max": 4,
            },
          ],
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
