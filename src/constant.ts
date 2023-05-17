import type { RuleItem } from 'async-validator'
import { ZodFirstPartyTypeKind } from 'zod'

export const TYPE_MAPPING: [ZodFirstPartyTypeKind, RuleItem['type']][] = [
  [ZodFirstPartyTypeKind.ZodString, 'string'],
  [ZodFirstPartyTypeKind.ZodNumber, 'number'],
  [ZodFirstPartyTypeKind.ZodObject, 'object'],
  [ZodFirstPartyTypeKind.ZodArray, 'array'],
  [ZodFirstPartyTypeKind.ZodBoolean, 'boolean'],
  [ZodFirstPartyTypeKind.ZodDate, 'date'],
]
