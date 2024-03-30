// src/formatStr.ts
import { parts } from "./parts.mjs";
import { escapeTokens } from "./common.mjs";
function formatStr(format, locale = "en", escapeLiterals = false, filterParts = () => true) {
  return parts(format, locale).filter(filterParts).reduce(
    (f, p) => f += escapeLiterals && p.partName === "literal" ? escapeTokens(p.token) : p.token,
    ""
  ).normalize("NFKC");
}
export {
  formatStr
};
//# sourceMappingURL=formatStr.mjs.map