import type {
  ZodNumber, ZodObject, ZodOptional,
  ZodString, ZodTypeAny,
} from 'zod'
import { ZodFirstPartyTypeKind } from 'zod'

export const zodIs = {
  object(type: ZodFirstPartyTypeKind, value: ZodTypeAny): value is ZodObject<any> {
    return type === ZodFirstPartyTypeKind.ZodObject
  },
  optional(type: ZodFirstPartyTypeKind, value: ZodTypeAny): value is ZodOptional<any> {
    return type === ZodFirstPartyTypeKind.ZodOptional
  },
  string(type: ZodFirstPartyTypeKind, value: ZodTypeAny): value is ZodString {
    return type === ZodFirstPartyTypeKind.ZodString
  },
  number(type: ZodFirstPartyTypeKind, value: ZodTypeAny): value is ZodNumber {
    return type === ZodFirstPartyTypeKind.ZodNumber
  },
}

export function isValidNumber(value: unknown): value is number {
  if (typeof value !== 'number')
    return false
  return !Number.isNaN(value)
}
