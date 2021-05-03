import { Month, CsvObject } from '../parser';

// Make Calculator generic class and then pass in key when creating new instance?
// e.g. const coldCalc = new Calculator('MinTempC'); etc.?
export class Calculator {
  // Returns warmest number for a particular metric (max temp, low temp, etc.) within a given month
  warmest = <K extends keyof CsvObject>(month: Month, key: K): number => {
    const set: number[] = [];
    month.forEach((m) => {
      set.push(Number(m[key]));
    });
    return Math.max(...set);
  };

  // Returns coldest number for a particular metric (max temp, low temp, etc.) within a given month
  coldest = <K extends keyof CsvObject>(month: Month, key: K): number => {
    const set: number[] = [];
    month.forEach((m) => {
      set.push(Number(m[key]));
    });
    return Math.min(...set);
  };

  // Returns the warmest number for each month of the year
  dataEachMonth = <K extends keyof CsvObject>(year: Month[], key: K) => {
    const yearArray: number[] = [];
    year.forEach((y) => {
      yearArray.push(this.warmest(y, key));
    });
    return yearArray;
  };
}
