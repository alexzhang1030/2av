import type { ZodObject } from 'zod'
import { ZodFirstPartyTypeKind } from 'zod'

export function instanceOf(value: any, constructor: Function) {
  return value instanceof constructor
}

export const zodIs = {
  object(type: ZodFirstPartyTypeKind, value: any): value is ZodObject<any> {
    return type === ZodFirstPartyTypeKind.ZodObject
  },
}
