import { Month, CsvObject, monthParser } from '../parser';
import { StatObject } from '../datatypes';

// Make Calculator generic class and then pass in key when creating new instance?
// e.g. const coldCalc = new Calculator('MinTempC'); etc.?
// Define key-value pair somewhere as such - checkbox key : CsvObject key
//                                          (e.g. maxtemp: 'MaxTemp(C)')
// Which is then used when the user selects which data they'd like
//
// Create method to get the date of warmest high, rather than just using warmest high of each month
export class Calculator {
  setter = <K extends keyof CsvObject>(set: CsvObject[], key: K): any => {
    const arr: number[] = [];
    set.forEach((s) => {
      arr.push(Number(s[key]));
    });

    return arr;
  };
  // Returns warmest number for a particular metric (max temp, low temp, etc.) within a given month
  warmest = <K extends keyof CsvObject>(month: CsvObject[], key: K): number => {
    const set: number[] = this.setter(month, key);
    return Math.max(...set);
  };
  // use full year array for extremes, use monthParser to get individual months and use those for averages
  monthlySummary = (set: CsvObject[]): any => {
    const year = monthParser(set);
    const { Jan, Feb } = year;

    const janAvgHigh = this.getAvg(Jan, 'MaxTemp(°C)').toFixed(1);
    const janAvgLow = this.getAvg(Jan, 'MinTemp(°C)').toFixed(1);
    const janMean = this.getAvg(Jan, 'MeanTemp(°C)').toFixed(1);
    const janPrecipTotal = this.getTotal(Jan, 'TotalPrecip(mm)').toFixed(1);

    const febAvgHigh = this.getAvg(Feb, 'MaxTemp(°C)').toFixed(1);
    const febAvgLow = this.getAvg(Feb, 'MinTemp(°C)').toFixed(1);
    const febMean = this.getAvg(Jan, 'MeanTemp(°C)').toFixed(1);

    return {
      Jan: {
        avgHigh: janAvgHigh,
        avgLow: janAvgLow,
        mean: janMean,
        precipTotal: janPrecipTotal,
      },
      Feb: {
        avgHigh: febAvgHigh,
        avgLow: febAvgLow,
        mean: febMean,
      },
    };
  };

  getAvg = <K extends keyof CsvObject>(month: CsvObject[], key: K): any => {
    const set: number[] = this.setter(month, key);
    return set.reduce((a, b) => a + b, 0) / set.length;
  };

  getTotal = <K extends keyof CsvObject>(month: CsvObject[], key: K): any => {
    const set: number[] = this.setter(month, key);
    return set.reduce((a, b) => a + b, 0);
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
    const set: number[] = this.setter(month, key);
    return Math.min(...set);
  };

  // Returns the warmest number for each month of the year
  dataEachMonth = <K extends keyof CsvObject>(year: CsvObject[], key: K) => {
    const yearArray: number[] = this.setter(year, key);
    return yearArray;
  };

  // Return the date of the warmest high
  specificDate = <K extends keyof CsvObject>(
    set: CsvObject[],
    key: K
  ): StatObject => {
    const newArray: number[] = this.setter(set, key);
    let dateIndex;
    let warmestNumber;
    let warmestNumberDate;
    warmestNumber = Math.max(...newArray);
    dateIndex = newArray.indexOf(Math.max(...newArray));
    warmestNumberDate = set[dateIndex]['Date/Time'];
    return {
      value: warmestNumber,
      date: warmestNumberDate,
    };
  };
}
