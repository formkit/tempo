# Tempo Development Guidelines

Tempo is a lightweight date/time utility library. It's a modern alternative to moment.js, focused on simplicity and tree-shakeability.

## Core Mantras

### 1. Format/Parse Round-Trip

**Any date format we produce must be parseable back to the same date.**

This is the most critical principle in tempo. If `format()` outputs a string, `parse()` must be able to read it back and produce an equivalent `Date` object.

```typescript
// This must ALWAYS work:
const original = new Date('2024-01-15T10:30:00Z')
const formatted = format(original, 'YYYY-MM-DDTHH:mm:ssZ', 'en')
const parsed = parse(formatted, 'YYYY-MM-DDTHH:mm:ssZ', 'en')
expect(parsed.getTime()).toBe(original.getTime())
```

When adding new formatting features, always ensure the corresponding parse support exists.

### 2. Leverage Intl APIs

Tempo uses `Intl.DateTimeFormat` for locale-aware formatting and timezone handling. This keeps the library lightweight while supporting all locales and timezones that the browser/runtime supports.

### 3. Tree-Shakeable Functions

Each function is in its own file and can be imported individually. Keep functions independent where possible.

## Bug Fix Process

**Always write failing tests first, then implement the fix.**

1. **Reproduce the issue** - Create a test that demonstrates the bug
2. **Run the test** - Verify it fails as expected
3. **Implement the fix** - Write the minimal code to make the test pass
4. **Run all tests** - Ensure no regressions

Example workflow:
```bash
# 1. Write test in src/__tests__/yourFeature.spec.ts
# 2. Run it to see it fail
npx vitest run src/__tests__/yourFeature.spec.ts

# 3. Implement the fix
# 4. Run all tests
npx vitest run
```

## Project Structure

```
tempo/
├── src/
│   ├── index.ts           # Public exports
│   ├── common.ts          # Shared utilities (internal)
│   ├── types.ts           # TypeScript types
│   ├── format.ts          # format() function
│   ├── parse.ts           # parse() function
│   ├── offset.ts          # offset() function
│   ├── applyOffset.ts     # applyOffset() function
│   ├── removeOffset.ts    # removeOffset() function
│   ├── iso8601.ts         # ISO 8601 validation
│   ├── date.ts            # date() helper
│   ├── tzDate.ts          # tzDate() for timezone dates
│   ├── add*.ts            # Date arithmetic (addDay, addMonth, etc.)
│   ├── diff*.ts           # Date differences (diffDays, diffMonths, etc.)
│   ├── same*.ts           # Date comparisons (sameDay, sameMonth, etc.)
│   ├── is*.ts             # Date predicates (isBefore, isAfter, etc.)
│   ├── *Start.ts          # Boundary functions (dayStart, monthStart, etc.)
│   ├── *End.ts            # Boundary functions (dayEnd, monthEnd, etc.)
│   └── __tests__/         # Test files (*.spec.ts)
├── docs/                  # Documentation (Nuxt app)
│   ├── components/
│   │   └── content/       # Main doc sections (Vue components)
│   └── examples/          # Code examples
└── package.json
```

## Documentation

Docs are in `docs/` as a Nuxt application with Vue components.

### Updating Docs

1. **Content sections** are in `docs/components/content/*.vue`
   - `Format.vue` - format() function and tokens
   - `Parse.vue` - parse() function
   - `Timezones.vue` - Timezone handling
   - `Modify.vue` - Date arithmetic
   - `Data.vue` - Date extraction
   - `Helpers.vue` - Utility functions

2. **Code examples** are in `docs/examples/*.ts`
   - Referenced in Vue files via `<CodeExample file="example-name" />`

3. **Run docs locally**:
   ```bash
   cd docs
   pnpm install
   pnpm dev
   ```

### When to Update Docs

- **New functions**: Add to appropriate content section and index.ts exports
- **New tokens/formats**: Update the token table in Format.vue
- **Behavior changes**: Update relevant sections and add examples
- **Bug fixes**: Usually no doc changes unless fixing documented behavior

## Key Implementation Details

### Timezone Offset Precision

Tempo supports full seconds precision in timezone offsets (e.g., `-05:32:11`). This is important for historical timezones that had sub-minute offsets.

- `offset()` calculates in seconds, not minutes
- `secsToOffset()` / `offsetToSecs()` handle conversion
- Seconds only appear in output when non-zero (backwards compatible)
- JavaScript's `Date` doesn't support offset seconds, so `parse()` handles them manually

### Internal vs Public API

- Functions in `common.ts` are internal utilities, not exported from index.ts
- Public API is everything exported from `src/index.ts`
- Keep internal functions internal unless there's a clear use case for exposing them

## Commands

```bash
pnpm install        # Install dependencies
pnpm build          # Build the library
pnpm test           # Run tests in watch mode
npx vitest run      # Run tests once
pnpm dev            # Run dev server (docs)
pnpm lint           # Lint code
```

## Testing Tips

- Tests are in `src/__tests__/*.spec.ts`
- Use descriptive test names that explain the expected behavior
- Test edge cases: timezones, DST transitions, leap years, locale variations
- For timezone tests, be aware that results may vary by environment

## Common Pitfalls

1. **JavaScript Date quirks**: `Date` objects represent absolute moments in time, not "dates in a timezone". Use `format()` with `tz` option for timezone-aware display.

2. **Locale sensitivity**: Many tokens (MMM, MMMM, ddd, dddd) are locale-dependent. Always test with multiple locales.

3. **DST transitions**: Be careful with date arithmetic around DST changes. A "day" isn't always 24 hours.

4. **Historical timezones**: Before standardization, timezones had offsets based on local mean time. Tempo handles these via the Intl API and seconds-precision offsets.
