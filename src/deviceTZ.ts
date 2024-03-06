/**
 * Get the timezone of the device.
 *
 * * Note: If the environment variable TZ is not set, it will return undefined.
 */
export function deviceTZ(): string | undefined {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}
