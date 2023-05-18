import type { ZodObject, ZodRawShape, ZodTypeAny } from 'zod'
import { util } from 'zod'
import type { RuleItem, Rules } from 'async-validator'
import { produceGroup } from './group'
import { removeEmptyRecordItem } from './utils'

function parseItem(item: ZodTypeAny): RuleItem[] {
  const group = produceGroup(item)
  const rules: RuleItem[] = removeEmptyRecordItem([
    group.type(),
    group.range(),
  ])
  return rules
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
