import type { ZodObject, ZodRawShape, ZodTypeAny } from 'zod'
import { util } from 'zod'
import type { RuleItem, Rules } from 'async-validator'
import { isValidNumber, zodIs } from './utils'
import { determineMessage, determineRange, determineType } from './determine'

function parseItem(item: ZodTypeAny): RuleItem {
  const optional = item.isOptional()

  const result = {
    type: 'string',
    required: !optional,
  } as RuleItem

  // Determine message
  if (!optional) {
    const message = determineMessage(item)
    if (message)
      result.message = message
  }

  // Determine type
  let zodType = item._def.typeName

  if (zodIs.optional(zodType, item))
    zodType = item._def.innerType._def.typeName

  result.type = determineType(zodType)

  // Determine deep rules
  if (zodIs.object(zodType, item))
    result.fields = parse(item)

  // Determine range
  const { min, max } = determineRange(item, zodType)
  if (isValidNumber(min))
    result.min = min

  if (isValidNumber(max))
    result.max = max

  return result
}

export function parse<T extends ZodRawShape>(schema: ZodObject<T>): Rules {
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
