import { Month, CsvObject } from '../parser';

export class Calculator {
  warmest = <K extends keyof CsvObject>(month: Month, key: K): number => {
    const set: number[] = [];
    month.forEach((m) => {
      set.push(Number(m[key]));
    });
    return Math.max(...set);
  };

  coldest = <K extends keyof CsvObject>(month: Month, key: K): number => {
    const set: number[] = [];
    month.forEach((m) => {
      set.push(Number(m[key]));
    });
    return Math.min(...set);
  };
}
