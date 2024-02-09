/**
 * Get the timezone of the device.
 */
export function deviceTZ() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}
