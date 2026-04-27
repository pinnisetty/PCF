import { RecordItem, RoleType, Country, Year } from "../types/types";

export const COUNTRIES: Country[] = [
  { key: "US", text: "United States", flag: "🇺🇸" }
];

export const YEARS: Year[] = [
  { key: 2024, text: "2024" }
];

export const MOCK_RECORDS: RecordItem[] = [
  {
    id: "1",
    country: "US",
    year: 2024,
    name: "John",
    role: "manager",
    location: {
      lat: 40,
      lng: -70,
      city: "NY"
    }
  }
];

export function getRecordCount(
  country: string,
  year: number,
  role: RoleType
): number {
  return MOCK_RECORDS.filter(
    r => r.country === country &&
         r.year === year &&
         r.role === role
  ).length;
}