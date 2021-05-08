export interface CsvObject {
  'Longitude(x)': string;
  'Latitude(y)': string;
  StationName: string;
  ClimateID: string;
  'Date/Time': string;
  Year: string;
  Month: string;
  Day: string;
  DataQuality: string;
  'MaxTemp(°C)': string;
  MaxTempFlag: string;
  'MinTemp(°C)': string;
  MinTempFlag: string;
  'MeanTemp(°C)': string;
  MeanTempFlag: string;
  'HeatDegDays(°C)': string;
  HeatDegDaysFlag: string;
  'CoolDegDays(°C)': string;
  CoolDegDaysFlag: string;
  'TotalRain(mm)': string;
  TotalRainFlag: string;
  'TotalSnow(cm)': string;
  TotalSnowFlag: string;
  'TotalPrecip(mm)': string;
  TotalPrecipFlag: string;
  'SnowonGrnd(cm)': string;
  SnowonGrndFlag: string;
  'DirofMaxGust(10s deg)': string;
  DirofMaxGustFlag: string;
  'SpdofMaxGust(km/h)': string;
  SpdofMaxGustFlag: string;
}

// Used for the monthly summaries
export interface MonthSummary {
  name: string;
  avgHigh: number;
  avgLow: number;
  mean: number;
  precipTotal: number;
  precipDays: number;
}

export interface StatObject {
  value: number;
  date: string;
}

export interface DataField {
  high: StatObject;
  low: StatObject;
  mean: StatObject;
}

// Used for monthly extremes
export interface MonthExtremeSum {
  name: string;
  warmest: DataField;
  coldest: DataField;
  precip: StatObject;
}

export type SummaryObject = MonthSummary[];

export type MonthSumType = MonthSummary | MonthExtremeSum;

export type StatsObject = {
  summary: MonthSummary;
  extremes: MonthExtremeSum;
};

export type YearStats = StatsObject[];
