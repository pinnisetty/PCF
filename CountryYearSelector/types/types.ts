// types.ts

export type RoleType = "manager" | "worker";

export interface Country {
  key: string;
  text: string;
  flag: string;
}

export interface Year {
  key: number;
  text: string;
}

export interface Location {
  lat: number;
  lng: number;
  city: string;
}

export interface RecordItem {
  id: string;
  country: string;
  year: number;
  name: string;
  role: RoleType;
  location: Location;
}

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  label: string;
  role: RoleType;
  city: string;
}

export interface HomePageProps {
  onNavigate: (role: RoleType, country: string, year: number) => void;
}