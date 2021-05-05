export interface Day {
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

export type Month = Day[];

export interface Year {
  Jan: Month;
  Feb: Month;
  Mar: Month;
  Apr: Month;
  May: Month;
  Jun: Month;
  Jul: Month;
  Aug: Month;
  Sep: Month;
  Oct: Month;
  Nov: Month;
  Dec: Month;
}

export type FullYear = Month[];

export interface AnalyzedData {
  warmest?: {
    high?: Year;
    low?: Year;
    mean?: Year;
  };
  coldest?: {
    high?: Year;
    low?: Year;
    mean?: Year;
  };
}
