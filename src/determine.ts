import type { ZodFirstPartyTypeKind, ZodTypeAny } from 'zod'
import type { RuleItem } from 'async-validator'
import { TYPE_MAPPING } from './constant'
import { zodIs } from './utils'

export function determineType(item: ZodFirstPartyTypeKind): RuleItem['type'] {
  for (const [shape, target] of TYPE_MAPPING) {
    if (item === shape)
      return target
  }
  return 'any'
}

export function determineRange(item: ZodTypeAny, zodType: ZodFirstPartyTypeKind) {
  if (zodIs.string(zodType, item)) {
    return {
      min: item.minLength,
      max: item.maxLength,
    }
  }
  if (zodIs.number(zodType, item)) {
    return {
      min: item.minValue,
      max: item.maxValue,
    }
  }
  return {
    min: null,
    max: null,
  }
}

export const determineMessage = {
  required(item: ZodTypeAny) {
    // Because zod does not provide a way to get the error message of the current item,
    // we can only get the error message of the current item through the errorMap function.

    // We use `errorMap?.({ code: 'invalid_type' }, { data: undefined })` to get
    // user custom defined `required_error`, you could see ./src/__test__/message.test.ts for more details.
    const customError = item._def.errorMap?.({ code: 'invalid_type' }, { data: undefined })
    if (customError)
      return customError.message
  },
}
