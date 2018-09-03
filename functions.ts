export const match = <K extends string, V extends { kind: K }>(v: V) => <O>(matches: { [k in V["kind"]]: O }) =>
  matches[v.kind] as O

export const match2 = <K extends string, V extends { kind: K }>(v: V) => <O>(
  matches: { [k in V["kind"]]: (args: V) => O },
) => matches[v.kind](v)
