import { Driver } from "../interfaces/Driver";

// @ts-ignore
globalThis[Symbol.for('TaskDriver')] = globalThis[Symbol.for('TaskDriver')] ?? new Map<string, any>();

// @ts-ignore
export const globalTaskDrivers: Map<string, any> = globalThis[Symbol.for('TaskDriver')];

export const add = (driver: any) => {
  globalTaskDrivers.set(driver.name, driver);
}
