// export type GenderResults = GenderResult;
// export type CountryResults = CountryResult;
// export type AgeResults = AgeResult;

export interface GenderResult {
  count: number;
  name: string;
  gender: string;
  probability: number;
}

export interface CountryResult {
  count: number;
  name: string;
  country: Country[];
}

export interface Country {
  country_id: string;
  probability: number;
}

export interface AgeResult {
  count: number;
  name: string;
  age: number;
}

export interface UserInfo {
  name: string;
  genderData?: GenderResult;
  ageData?: AgeResult;
  nationalitiesData?: CountryResult;
  error?: string;
}

export interface CovidResults {
  links: Links;
  meta: Meta;
  data: CovidData[];
}

export interface CovidData {
  date: Date;
  states: number;
  cases: Cases;
  testing: Cases;
  outcomes: Outcomes;
}

export interface Cases {
  total: Total;
}

export interface Total {
  value: number | null;
  calculated: Calculated;
}

export interface Calculated {
  population_percent: number | null;
  change_from_prior_day: number | null;
  seven_day_change_percent: number | null;
  seven_day_average?: number | null;
}

export interface Outcomes {
  hospitalized: Hospitalized;
  death: Cases;
}

export interface Hospitalized {
  currently: Total;
  in_icu: InIcu;
  on_ventilator: InIcu;
}

export interface InIcu {
  currently: Total;
}

export interface Links {
  self: string;
}

export interface Meta {
  build_time: Date;
  license: string;
  version: string;
  field_definitions: FieldDefinition[];
}

export interface FieldDefinition {
  name: string;
  field?: string;
  deprecated: boolean;
  prior_names: string[];
}

export interface ApiError {
  error: string;
}
