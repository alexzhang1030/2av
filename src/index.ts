import { util, z } from 'zod'
import type { RuleItem, Rules } from 'async-validator'

function parseEachType(item: z.ZodTypeAny): RuleItem['type'] | null {
  if (item instanceof z.ZodString)
    return null
  if (item instanceof z.ZodNumber)
    return 'number'
  if (item instanceof z.ZodArray)
    return 'array'
}

function parseItem(item: z.ZodTypeAny): RuleItem {
  const optional = item.isOptional()

  const result = {
    type: 'string',
    required: !optional,
  } as RuleItem

  if (item instanceof z.ZodOptional) {
    const _type = item._def.innerType
    const parsedType = parseEachType(_type)
    if (parsedType)
      result.type = parsedType
  }

  return result
}

export function parse<T extends z.ZodRawShape>(schema: z.ZodObject<T>): Rules {
  const shape = schema.shape
  const keys = util.objectKeys(shape)
  if (!keys.length)
    return {}

  const rules: Rules = {}
  for (const key of keys) {
    const item = shape[key]
    rules[key] = parseItem(item)
  }

  return rules
}
