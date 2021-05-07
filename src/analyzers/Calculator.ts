import { Month, CsvObject, monthParser } from '../parser';
import {
  StatObject,
  MonthSummary,
  Year,
  MonthSummExtreme,
  MonthSummAvg,
} from '../datatypes';

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

  // Returns coldest number for a particular metric (max temp, low temp, etc.) within a given month
  coldest = <K extends keyof CsvObject>(month: Month, key: K): number => {
    const set: number[] = this.setter(month, key);
    return Math.min(...set);
  };

  getAvg = <K extends keyof CsvObject>(month: CsvObject[], key: K): any => {
    const set: number[] = this.setter(month, key);
    return set.reduce((a, b) => a + b, 0) / set.length;
  };

  getTotal = <K extends keyof CsvObject>(month: CsvObject[], key: K): any => {
    const set: number[] = this.setter(month, key);
    return set.reduce((a, b) => a + b, 0);
  };

  getPrecipDays = <K extends keyof CsvObject>(
    month: CsvObject[],
    key: K
  ): any => {
    const set: number[] = this.setter(month, key);
    const count: number = set.filter((s) => {
      return s > 0;
    }).length;
    return count;
  };

  getMonthSummary = (month: CsvObject[]): MonthSummAvg => {
    return {
      avgHigh: this.getAvg(month, 'MaxTemp(°C)').toFixed(1),
      avgLow: this.getAvg(month, 'MinTemp(°C)').toFixed(1),
      mean: this.getAvg(month, 'MeanTemp(°C)').toFixed(1),
      precipTotal: this.getTotal(month, 'TotalPrecip(mm)').toFixed(1),
      precipDays: this.getPrecipDays(month, 'TotalPrecip(mm)'),
    };
  };

  // use full year array for extremes, use monthParser to get individual months and use those for averages
  monthlySummary = (set: CsvObject[]): any => {
    const year = monthParser(set);
    const { Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec } = year;

    const JanSummary: MonthSummary = this.getMonthSummary(Jan);
    const FebSummary: MonthSummary = this.getMonthSummary(Feb);
    const MarSummary: MonthSummary = this.getMonthSummary(Mar);
    const AprSummary: MonthSummary = this.getMonthSummary(Apr);
    const MaySummary: MonthSummary = this.getMonthSummary(May);
    const JunSummary: MonthSummary = this.getMonthSummary(Jun);
    const JulSummary: MonthSummary = this.getMonthSummary(Jul);
    const AugSummary: MonthSummary = this.getMonthSummary(Aug);
    const SepSummary: MonthSummary = this.getMonthSummary(Sep);
    const OctSummary: MonthSummary = this.getMonthSummary(Oct);
    const NovSummary: MonthSummary = this.getMonthSummary(Nov);
    const DecSummary: MonthSummary = this.getMonthSummary(Dec);

    return {
      Jan: JanSummary,
      Feb: FebSummary,
      Mar: MarSummary,
      Apr: AprSummary,
      May: MaySummary,
      Jun: JunSummary,
      Jul: JulSummary,
      Aug: AugSummary,
      Sep: SepSummary,
      Oct: OctSummary,
      Nov: NovSummary,
      Dec: DecSummary,
    };
  };

  warmestEachMonth = (set: CsvObject[]): any => {
    const year = monthParser(set);
    const { Jan, Feb, Mar } = year;
    const janWarmestHigh = this.extremeData(Jan, 'MaxTemp(°C)');
    const janWarmestLow = this.extremeData(Jan, 'MinTemp(°C)');
    const janWarmestMean = this.extremeData(Jan, 'MeanTemp(°C)');

    const febWarmestHigh = this.extremeData(Feb, 'MaxTemp(°C)');
    const febWarmestLow = this.extremeData(Feb, 'MinTemp(°C)');
    const febWarmestMean = this.extremeData(Feb, 'MeanTemp(°C)');

    const marWarmestHigh = this.extremeData(Mar, 'MaxTemp(°C)');
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

  // Returns the warmest number for each month of the year
  dataEachMonth = <K extends keyof CsvObject>(year: CsvObject[], key: K) => {
    const yearArray: number[] = this.setter(year, key);
    return yearArray;
  };

  // Return the date of the warmest high
  extremeData = <K extends keyof CsvObject>(
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
