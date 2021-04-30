import { Month } from '../parser';

// Add key to parameters so it can be used on any value (MaxTemp, MeanTemp, MinTemp, etc)
// Only one "warmest" parser instead of one for every data type
// Instead of key: string, make Enum of different keys in CsvObject
export const warmestHigh = (month: Month, key: string): number => {
  const highs: number[] = [];
  month.forEach((m) => {
    highs.push(Number(m['MaxTemp(°C)']));
  });
  return Math.max(...highs);
};
