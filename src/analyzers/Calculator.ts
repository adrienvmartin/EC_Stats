import { Month, CsvObject, monthParser } from '../parser';
import { MonthSummary, MonthSummExtreme, SummaryObject } from '../datatypes';
import dayjs from 'dayjs';

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

  // Returns the average of a given set
  getAvg = <K extends keyof CsvObject>(month: CsvObject[], key: K): any => {
    const set: number[] = this.setter(month, key);
    return set.reduce((a, b) => a + b, 0) / set.length;
  };

  // Returns the total of a given set
  getTotal = <K extends keyof CsvObject>(month: CsvObject[], key: K): any => {
    const set: number[] = this.setter(month, key);
    return set.reduce((a, b) => a + b, 0);
  };

  // Returns the number of days with measureable precipitation
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

  getMonthName = (set: CsvObject[]): any => {
    return dayjs(set[0].Month).format('MMMM');
  };

  // Returns a summary of temperature averages & precipitation totals/days for a given month
  getMonthSummary = (month: CsvObject[]): MonthSummary => {
    return {
      name: this.getMonthName(month),
      avgHigh: this.getAvg(month, 'MaxTemp(°C)').toFixed(1),
      avgLow: this.getAvg(month, 'MinTemp(°C)').toFixed(1),
      mean: this.getAvg(month, 'MeanTemp(°C)').toFixed(1),
      precipTotal: this.getTotal(month, 'TotalPrecip(mm)').toFixed(1),
      precipDays: this.getPrecipDays(month, 'TotalPrecip(mm)'),
    };
  };

  // Returns a summary of temperature & precipitation extremes throughout the month
  getMonthExtremes = (
    month: CsvObject[]
  ): any /* will be MonthSummExtreme*/ => {
    return {
      warmest: {
        high: this.extremeData(month, 'MaxTemp(°C)').warmest.value,
        low: this.extremeData(month, 'MinTemp(°C)'),
        mean: this.extremeData(month, 'MeanTemp(°C)'),
      },
      precip: this.extremeData(month, 'TotalPrecip(mm)').precip,
    };
  };

  // Returns a year's worth of monthly summaries
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

    return [
      JanSummary,
      FebSummary,
      MarSummary,
      AprSummary,
      MaySummary,
      JunSummary,
      JulSummary,
      AugSummary,
      SepSummary,
      OctSummary,
      NovSummary,
      DecSummary,
    ];
  };

  // Returns the extreme highs for a given month
  extremeHighs = (set: CsvObject[]): any => {
    const highs = this.setter(set, 'MaxTemp(°C)');

    // Return warmest high & corresponding date
    const warmestNumber = Math.max(...highs);
    const warmestIndex = highs.indexOf(warmestNumber);
    const warmestDate = set[warmestIndex]['Date/Time'];

    // Return coldest high & corresponding date
    const coldest = Math.min(...highs);
    const coldIndex = highs.indexOf(coldest);
    const coldestDate = set[coldIndex]['Date/Time'];

    return {
      warmest: {
        high: {
          value: warmestNumber,
          date: warmestDate,
        },
      },
      coldest: {
        high: {
          value: coldest,
          date: coldestDate,
        },
      },
    };
  };

  // Returns the warmest and coldest highs for a given month
  extremeData = <K extends keyof CsvObject>(set: CsvObject[], key: K): any => {
    const newArray: number[] = this.setter(set, key);
    let warmDateIndex;
    let warmestNumber;
    let warmestNumberDate;
    let coldDateIndex;
    let coldestNumber;
    let coldestNumberDate;

    const precipArray: number[] = this.setter(set, 'TotalPrecip(mm)');
    const maxPrecip = Math.max(...precipArray);
    const precipIndex = precipArray.indexOf(Math.max(...precipArray));
    const precipDay = set[precipIndex]['Date/Time'];

    warmestNumber = Math.max(...newArray);
    coldestNumber = Math.min(...newArray);

    warmDateIndex = newArray.indexOf(Math.max(...newArray));
    coldDateIndex = newArray.indexOf(Math.min(...newArray));

    warmestNumberDate = set[warmDateIndex]['Date/Time'];
    coldestNumberDate = set[coldDateIndex]['Date/Time'];

    return {
      warmest: {
        value: warmestNumber,
        date: warmestNumberDate,
      },
      coldest: {
        value: coldestNumber,
        date: coldestNumberDate,
      },
      precip: {
        value: maxPrecip,
        date: precipDay,
      },
    };
  };

  // Renders the stats
  /*renderStats = (avg: SummaryObject, xtr?: MonthSummExtreme): any => {
    avg.forEach((a) => {
      console.log(`${a.name}: \n`);
      console.log('Average high: ', a.avgHigh);
    });
  };
  console.log(
      `January: \n Average high: ${avg.Jan.avgHigh} \n Average low: ${avg.Jan.avgLow} \n Mean: ${avg.Jan.mean} \n Precipitation totals: ${avg.Jan.precipTotal} \n Precipitation days: ${avg.Jan.precipDays}`
    );
    console.log(
      `February: \n Average high: ${avg.Feb.avgHigh} \n Average low: ${avg.Feb.avgLow} \n Mean: ${avg.Feb.mean} \n Precipitation totals: ${avg.Feb.precipTotal} \n Precipitation days: ${avg.Feb.precipDays}`
    );
  };*/
}
