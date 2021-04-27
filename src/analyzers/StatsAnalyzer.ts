export class StatsAnalysis {}

export const warmestHigh = (highs: string[]) => {
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
