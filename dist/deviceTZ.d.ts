/**
 * Get the timezone of the device.
 *
 * * Note: If the environment variable TZ is not set, it will return undefined.
 */
declare function deviceTZ(): string | undefined;

export { deviceTZ };
