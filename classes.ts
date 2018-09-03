import { Either, right, left } from "fp-ts/lib/Either"
import { match, match2 } from "./functions"

// --------- Implementation ---------- //

export abstract class Tagged {
  protected readonly tag = "Tagged"
}

export class UnvalidatedWidgetCode extends Tagged {
  public readonly kind = "UnvalidatedWidgetCode"
  private constructor(public readonly code: string) {
    super()
  }
  public static create = (code: string): UnvalidatedWidgetCode => new UnvalidatedWidgetCode(code)
}

export class ValidatedWidgetCode extends Tagged {
  public readonly kind = "ValidatedWidgetCode"
  private constructor(public readonly code: string, public readonly type: number) {
    super()
  }
  public static create = (code: string, type: number): Either<string, ValidatedWidgetCode> =>
    /W-.+/i.test(code)
      ? right<never, ValidatedWidgetCode>(new ValidatedWidgetCode(code, type))
      : left<string, never>("Invalid product code")
}

export type WidgetCode = UnvalidatedWidgetCode | ValidatedWidgetCode

export type ValidateWidget = (w: UnvalidatedWidgetCode) => Either<string, ValidatedWidgetCode>
export const validateWidget: ValidateWidget = code => ValidatedWidgetCode.create(code.code, 5)

// --------- Usage ---------- //

const unvalidated = UnvalidatedWidgetCode.create("W-other")
const validated = validateWidget(unvalidated)

console.log(unvalidated)
validated.fold(console.log, console.log)

const code = unvalidated as WidgetCode

const result = match(code)({
  ValidatedWidgetCode: 0,
  UnvalidatedWidgetCode: 1,
})
console.log(result)

const validatedFake1: WidgetCode = {
  kind: "ValidatedWidgetCode",
  code: "XPTO",
  type: 5,
}

const validatedFake2: WidgetCode = {
  tag: "Tagged",
  kind: "ValidatedWidgetCode",
  code: "XPTO",
  type: 5,
}

const result2 = match2(unvalidated as WidgetCode)({
  ValidatedWidgetCode: c => c.kind === "ValidatedWidgetCode" && `${c.code}-${c.type}`,
  UnvalidatedWidgetCode: ({ code }) => code,
})
console.log(result2)
