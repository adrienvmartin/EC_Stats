import { Month } from '../parser';

export const warmestHigh = (month: Month): any => {
  const highs: number[] = [];
  month.forEach((m) => {
    highs.push(Number(m['MaxTemp(°C)']));
  });
  return Math.max(...highs);
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
