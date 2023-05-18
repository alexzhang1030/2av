import type { ZodObject, ZodOptional, ZodTypeAny } from 'zod'
import { ZodFirstPartyTypeKind } from 'zod'

export const zodIs = {
  object(type: ZodFirstPartyTypeKind, value: ZodTypeAny): value is ZodObject<any> {
    return type === ZodFirstPartyTypeKind.ZodObject
  },
  optional(type: ZodFirstPartyTypeKind, value: ZodTypeAny): value is ZodOptional<any> {
    return type === ZodFirstPartyTypeKind.ZodOptional
  },
}
