import { parts } from "./parts"
import { escapeTokens } from "./common"
import type { Format, Part } from "./types"

/**
 * Return the string format for a given format. For example:
 * ```js
 * formatStr({ date: 'long' }, 'en') // dddd, MMMM D, YYYY
 * ```
 * @param format - A format string or object.
 * @param locale - A locale or en by default.
 */
export function formatStr(
  format: Format,
  locale = "en",
  escapeLiterals = false,
  filterParts: (part: Part) => boolean = () => true
): string {
  return parts(format, locale)
    .filter(filterParts)
    .reduce(
      (f, p) =>
        (f +=
          escapeLiterals && p.partName === "literal"
            ? escapeTokens(p.token)
            : p.token),
      ""
    )
    .normalize("NFKC")
}
