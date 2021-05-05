export interface DayObject {
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

export type Month = DayObject[];

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

export interface AnalyzedMonth {
  warmest: {
    high: {
      value: string;
      date: string;
    };
    low: {
      value: string;
      date: string;
    };
    mean: {
      value: string;
      date: string;
    };
  };
  coldest: {
    high: {
      value: string;
      date: string;
    };
    low: {
      value: string;
      date: string;
    };
    mean: {
      value: string;
      date: string;
    };
  };
}

// Don't use full year/month array as it's unnecessary, instead get just the relevant values
// e.g. warmest: { high: { Jan: '4.5', Feb: '7.2', Mar: '12.4' } }, etc.
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
