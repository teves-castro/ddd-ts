import { UnvalidatedWidgetCode, ValidatedWidgetCode, WidgetCode, validateWidget } from "./taggedUnions"
import { match2, match } from "./functions"

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
