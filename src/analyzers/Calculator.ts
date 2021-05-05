import { Month, CsvObject, ParameterObject } from '../parser';

// Make Calculator generic class and then pass in key when creating new instance?
// e.g. const coldCalc = new Calculator('MinTempC'); etc.?
// Define key-value pair somewhere as such - checkbox key : CsvObject key
//                                          (e.g. maxtemp: 'MaxTemp(C)')
// Which is then used when the user selects which data they'd like
//
// Create method to get the date of warmest high, rather than just using warmest high of each month
export class Calculator {
  // Returns warmest number for a particular metric (max temp, low temp, etc.) within a given month
  warmest = <K extends keyof CsvObject>(month: Month, key: K): number => {
    const set: number[] = [];
    month.forEach((m) => {
      set.push(Number(m[key]));
    });
    return Math.max(...set);
  };

  fromYear = (year: CsvObject[]): number => {
    const Jan = year.filter((y) => y.Month === '01');
    let warmestJanArray: number[] = [];
    let janWarmestLowArr: number[] = [];
    let janWarmestMeanArr: number[] = [];
    Jan.forEach((j) => warmestJanArray.push(Number(j['MinTemp(°C)'])));
    const janWarmestHigh = Math.max(...warmestJanArray);
    const janWarmestLow = Math.max(...janWarmestLowArr);
    return Math.min(...warmestJanArray);
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

  // Return the date of the warmest high
  specificDate = <K extends keyof CsvObject>(
    set: CsvObject[],
    key: K
  ): ParameterObject => {
    const newArray: number[] = [];
    let dateIndex;
    let warmestNumber;
    let warmestNumberDate;
    set.forEach((s) => {
      newArray.push(Number(s[key]));
    });
    warmestNumber = Math.max(...newArray);
    dateIndex = newArray.indexOf(Math.max(...newArray));
    warmestNumberDate = set[dateIndex]['Date/Time'];
    return {
      parameter: key,
      value: warmestNumber,
      date: warmestNumberDate,
    };
  };
}
