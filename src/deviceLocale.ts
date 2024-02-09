/**
 * Returns the device's locale. This is a simple proxy of the
 * `Intl.DateTimeFormat().resolvedOptions().locale` call.
 */
export function deviceLocale() {
  return Intl.DateTimeFormat().resolvedOptions().locale
}
