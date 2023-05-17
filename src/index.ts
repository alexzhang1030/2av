import type { ZodFirstPartyTypeKind, z } from 'zod'
import { util } from 'zod'
import type { RuleItem, Rules } from 'async-validator'
import { zodIs } from './utils'
import { TYPE_MAPPING } from './constant'

function determineType(item: ZodFirstPartyTypeKind): RuleItem['type'] {
  for (const [shape, target] of TYPE_MAPPING) {
    if (item === shape)
      return target
  }
  return 'any'
}

function parseItem(item: z.ZodTypeAny): RuleItem {
  const optional = item.isOptional()

  const result = {
    type: 'string',
    required: !optional,
  } as RuleItem

  let zodType = item._def.typeName

  if (zodIs.optional(zodType, item))
    zodType = item._def.innerType._def.typeName

  result.type = determineType(zodType)

  if (zodIs.object(zodType, item))
    result.fields = parse(item)

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
