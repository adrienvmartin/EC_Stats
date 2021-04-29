export interface CsvObject {
  'Longitude (x)': string;
  'Latitude (y)': string;
  'Station Name': string;
  'Climate ID': string;
  'Date/Time': string;
  Year: string;
  Month: string;
  Day: string;
  'Data Quality': string;
  'Max Temp (°C)': string;
  'Max Temp Flag': string;
  'Min Temp (°C)': string;
  'Min Temp Flag': string;
  'Mean Temp (°C)': string;
  'Mean Temp Flag': string;
  'Heat Deg Days (°C)': string;
  'Heat Deg Days Flag': string;
  'Cool Deg Days (°C)': string;
  'Cool Deg Days Flag': string;
  'Total Rain (mm)': string;
  'Total Rain Flag': string;
  'Total Snow (cm)': string;
  'Total Snow Flag': string;
  'Total Precip (mm)': string;
  'Total Precip Flag': string;
  'Snow on Grnd (cm)': string;
  'Snow on Grnd Flag': string;
  'Dir of Max Gust (10s deg)': string;
  'Dir of Max Gust Flag': string;
  'Spd of Max Gust (km/h)': string;
  'Spd of Max Gust Flag': string;
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
  Jan: {}[];
  Feb: {}[];
  Mar: {}[];
  Apr: {}[];
  May: {}[];
  Jun: {}[];
  Jul: {}[];
  Aug: {}[];
  Sep: {}[];
  Oct: {}[];
  Nov: {}[];
  Dec: {}[];
}
