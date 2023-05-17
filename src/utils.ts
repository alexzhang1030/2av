import type { ZodObject, ZodOptional } from 'zod'
import { ZodFirstPartyTypeKind } from 'zod'

export function instanceOf(value: any, constructor: Function) {
  return value instanceof constructor
}

export const zodIs = {
  object(type: ZodFirstPartyTypeKind, value: any): value is ZodObject<any> {
    return type === ZodFirstPartyTypeKind.ZodObject
  },
  optional(type: ZodFirstPartyTypeKind, value: any): value is ZodOptional<any> {
    return type === ZodFirstPartyTypeKind.ZodOptional
  },
}
