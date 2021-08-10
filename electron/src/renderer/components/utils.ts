
export function mergeClassNames(c1: string, c2: string) {
    if (c1[c1.length - 1] != " ") {
        return c1.concat(" ", c2)
    } else {
        return c1 + c2
    }
}
