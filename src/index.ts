import type { z } from 'zod'
import { ZodFirstPartyTypeKind, util } from 'zod'
import type { RuleItem, Rules } from 'async-validator'
import { zodIs } from './utils'

const typeMapping: [ZodFirstPartyTypeKind, RuleItem['type']][] = [
  [ZodFirstPartyTypeKind.ZodString, 'string'],
  [ZodFirstPartyTypeKind.ZodNumber, 'number'],
  [ZodFirstPartyTypeKind.ZodObject, 'object'],
  [ZodFirstPartyTypeKind.ZodArray, 'array'],
  [ZodFirstPartyTypeKind.ZodBoolean, 'boolean'],
  [ZodFirstPartyTypeKind.ZodDate, 'date'],
]

function determineType(item: ZodFirstPartyTypeKind): RuleItem['type'] {
  for (const [shape, target] of typeMapping) {
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

  if (zodType === ZodFirstPartyTypeKind.ZodOptional)
    zodType = item._def.innerType._def.typeName

  result.type = determineType(zodType)

  if (zodIs.object(zodType, item)) {
    result.fields = {
      ...parse(item),
    }
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
