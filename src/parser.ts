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

export const monthParser = (data: CsvObject[]) => {
  // Add check for leap years

  const Jan = data.slice(0, 31);
  const Feb = data.slice(31, 60);
  const Mar = data.slice(60, 91);
  const Apr = data.slice(91, 121);
  const May = data.slice(121, 152);
  const Jun = data.slice(152, 182);
  const Jul = data.slice(182, 213);
  const Aug = data.slice(213, 244);
  const Sep = data.slice(244, 274);
  const Oct = data.slice(274, 305);
  const Nov = data.slice(305, 335);
  const Dec = data.slice(335, 366);

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

export interface Months {
  Jan: CsvObject[];
  Feb: CsvObject[];
  Mar: CsvObject[];
  Apr: CsvObject[];
  May: CsvObject[];
  Jun: CsvObject[];
  Jul: CsvObject[];
  Aug: CsvObject[];
  Sep: CsvObject[];
  Oct: CsvObject[];
  Nov: CsvObject[];
  Dec: CsvObject[];
}

export type Month = CsvObject[];
