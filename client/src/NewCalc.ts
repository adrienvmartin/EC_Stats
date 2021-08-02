import { CsvObject } from './datatypes';

export class StatsCalc {
  setter = <K extends keyof CsvObject>(set: CsvObject[], key: K) => {
    const arr: number[] = [];
    set.forEach((s) => {
      if (s[key] !== '') {
        arr.push(Number(s[key]));
      }
    });
    return arr;
  };
}
