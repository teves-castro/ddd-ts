import { Either, right, left } from "fp-ts/lib/Either"
import { match, match2 } from "./functions";

// --------- Implementation ---------- //

export interface UnvalidatedWidgetCode {
  readonly kind: "UnvalidatedWidgetCode"
  readonly code: string
}
export const UnvalidatedWidgetCode = (code: string): UnvalidatedWidgetCode => ({
  kind: "UnvalidatedWidgetCode",
  code,
})

export interface ValidatedWidgetCode {
  readonly kind: "ValidatedWidgetCode"
  readonly code: string
  readonly type: number
}
export const ValidatedWidgetCode = (code: string): Either<string, ValidatedWidgetCode> =>
  /W-.+/i.test(code)
    ? right<never, ValidatedWidgetCode>({ kind: "ValidatedWidgetCode", code, type: 123 })
    : left<string, never>("Invalid product code")

export type WidgetCode = UnvalidatedWidgetCode | ValidatedWidgetCode

export type ValidateWidget = (w: UnvalidatedWidgetCode) => Either<string, ValidatedWidgetCode>
export const validateWidget: ValidateWidget = code => ValidatedWidgetCode(code.code)

// --------- Usage ---------- //

const unvalidated = UnvalidatedWidgetCode("W-other")
const validated = validateWidget(unvalidated)

console.log(unvalidated)
validated.fold(console.log, console.log)

const code = unvalidated as WidgetCode

const result = match(code)({
  ValidatedWidgetCode: 0,
  UnvalidatedWidgetCode: 1,
})
console.log(result)

const validatedFake: ValidatedWidgetCode = {
  kind: "ValidatedWidgetCode",
  code: "XPTO",
  type: 5,
}

const result2 = match2(validatedFake as WidgetCode)({
  ValidatedWidgetCode: (v: any) => `${v.code}-${v.type}`,
  UnvalidatedWidgetCode: ({ code }) => code,
})
console.log(result2)
