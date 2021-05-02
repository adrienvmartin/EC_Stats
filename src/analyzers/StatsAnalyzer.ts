import { Month, CsvObject } from '../parser';

// Add key to parameters so it can be used on any value (MaxTemp, MeanTemp, MinTemp, etc)
// Only one "warmest" parser instead of one for every data type
// Instead of key: string, make Enum of different keys in CsvObject
export const warmestHigh = (month: Month, key: [keyof CsvObject]): number => {
  const highs: number[] = [];
  month.forEach((m) => {
    highs.push(Number(m['MaxTemp(°C)']));
  });
  return Math.max(...highs);
};

// T = CsvObject, K extends the keys of CsvObject & uses them as its value for inputting which stat we want
export class Calculator<T> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  warmest = <K extends keyof CsvObject>(month: Month, key: K): number => {
    const highs: number[] = [];
    month.forEach((m) => {
      highs.push(Number(m[key]));
    });
    return Math.max(...highs);
  };
}
