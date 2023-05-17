import type { Rules, ValidateError } from 'async-validator'
import type { ZodObject } from 'zod'
import Schema from 'async-validator'
import { parse } from '@/index'

export function inTestScope(
  rule: ZodObject<any>,
  exampleInput: Record<PropertyKey, any>,
  cb: (rule: Rules, errors: (ValidateError[] | null)) => void,
) {
  const avRules = parse(rule)
  const validator = new Schema(avRules)
  validator.validate(exampleInput, (errors) => {
    cb(avRules, errors)
  })
}
