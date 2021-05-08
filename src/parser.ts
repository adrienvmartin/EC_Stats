export type CsvObject = {
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
};

export const monthParser = (data: CsvObject[]) => {
  const Jan = data.filter((d) => d.Month === '01');
  const Feb = data.filter((d) => d.Month === '02');
  const Mar = data.filter((d) => d.Month === '03');
  const Apr = data.filter((d) => d.Month === '04');
  const May = data.filter((d) => d.Month === '05');
  const Jun = data.filter((d) => d.Month === '06');
  const Jul = data.filter((d) => d.Month === '07');
  const Aug = data.filter((d) => d.Month === '08');
  const Sep = data.filter((d) => d.Month === '09');
  const Oct = data.filter((d) => d.Month === '10');
  const Nov = data.filter((d) => d.Month === '11');
  const Dec = data.filter((d) => d.Month === '12');

  return {
    Jan,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec,
  };
};

export const newParser = (data: CsvObject[]) => {
  return data.filter((d) => d.Month === '02');
};

export interface Months {
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

export type Month = CsvObject[];

export interface ParameterObject {
  parameter: string;
  value: string | number | boolean;
  date: string;
}
