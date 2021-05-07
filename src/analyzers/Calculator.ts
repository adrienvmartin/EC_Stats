import { Month, CsvObject, ParameterObject, monthParser } from '../parser';
import { AnalyzedMonth, StatObject } from '../datatypes';

// Make Calculator generic class and then pass in key when creating new instance?
// e.g. const coldCalc = new Calculator('MinTempC'); etc.?
// Define key-value pair somewhere as such - checkbox key : CsvObject key
//                                          (e.g. maxtemp: 'MaxTemp(C)')
// Which is then used when the user selects which data they'd like
//
// Create method to get the date of warmest high, rather than just using warmest high of each month
export class Calculator {
  // Returns warmest number for a particular metric (max temp, low temp, etc.) within a given month
  warmest = <K extends keyof CsvObject>(month: CsvObject[], key: K): number => {
    const set: number[] = [];
    month.forEach((m) => {
      set.push(Number(m[key]));
    });
    return Math.max(...set);
  };

  monthlySummary = (set: CsvObject[]): any => {
    const year = monthParser(set);
    const { Jan } = year;

    return this.getAvg(Jan, 'MaxTemp(°C)').toFixed(1);
  };

  getAvg = <K extends keyof CsvObject>(month: CsvObject[], key: K): any => {
    const set: number[] = [];
    month.forEach((m) => {
      set.push(Number(m[key]));
    });
    return set.reduce((a, b) => a + b, 0) / set.length;
  };

  warmestEachMonth = (set: CsvObject[]): any => {
    const year = monthParser(set);
    const { Jan, Feb, Mar } = year;
    const janWarmestHigh = this.specificDate(Jan, 'MaxTemp(°C)');
    const janWarmestLow = this.specificDate(Jan, 'MinTemp(°C)');
    const janWarmestMean = this.specificDate(Jan, 'MeanTemp(°C)');

    const febWarmestHigh = this.specificDate(Feb, 'MaxTemp(°C)');
    const febWarmestLow = this.specificDate(Feb, 'MinTemp(°C)');
    const febWarmestMean = this.specificDate(Feb, 'MeanTemp(°C)');

    const marWarmestHigh = this.specificDate(Mar, 'MaxTemp(°C)');
    return {
      Jan: {
        warmest: {
          high: janWarmestHigh,
          low: janWarmestLow,
          mean: janWarmestMean,
        },
      },
      Feb: {
        warmest: {
          high: febWarmestHigh,
          low: febWarmestLow,
          mean: febWarmestMean,
        },
      },
      Mar: {
        warmest: {
          high: marWarmestHigh,
        },
      },
    };
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
  ): StatObject => {
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
      value: warmestNumber,
      date: warmestNumberDate,
    };
  };
}
