import { CsvObject } from '../parser';

export const warmestHigh = (months: CsvObject[]): number => {
  const highs: string[] = [];
  months.forEach((m) => {
    highs.push(m['MaxTemp(°C)']);
  });
  return Math.max(Number(highs));
};

export const coldestHigh = (highs: string[]) => {
  return Math.min(Number(highs));
};

export const warmestLow = (lows: string[]) => {
  return Math.max(Number(lows));
};

export const coldestLow = (lows: string[]) => {
  return Math.min(Number(lows));
};
