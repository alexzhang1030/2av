import type { RuleItem } from 'async-validator'
import type { ZodTypeAny } from 'zod'
import { determineMessage, determineRange, determineType } from './determine'
import { isValidNumber, zodIs } from './utils'
import { parse } from '.'

function produceRule(init: Partial<RuleItem> = {}): RuleItem {
  return { ...init }
}

export function produceGroup(item: ZodTypeAny) {
  const optional = item.isOptional()
  let zodType = item._def.typeName
  if (zodIs.optional(zodType, item))
    zodType = item._def.innerType._def.typeName

  const privateOperation = {
    deepRules(rule: RuleItem) {
      if (zodIs.object(zodType, item))
        rule.fields = parse(item)
    },
  }

  return {
    required() {
      const rule = produceRule({
        required: !optional,
      })
      // get required custom messages
      if (!optional) {
        const message = determineMessage.required(item)
        if (message)
          rule.message = message
      }
      return rule
    },
    type() {
      const rule = produceRule({
        type: 'string',
      })

      // determine type
      if (zodIs.optional(zodType, item))
        zodType = item._def.innerType._def.typeName
      rule.type = determineType(zodType)

      // move deep rules to determine type
      privateOperation.deepRules(rule)
      return rule
    },
    range() {
      const rule = produceRule()
      const { min, max } = determineRange(item, zodType)
      if (isValidNumber(min))
        rule.min = min

      if (isValidNumber(max))
        rule.max = max
      return rule
    },
  }
}
