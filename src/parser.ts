import { CsvObject } from './datatypes';

export const monthParser = (data: CsvObject[]) => {
  const Jan = data.filter((d) => d.Month === '01');
  const Feb = data.filter((d) => d.Month === '02');
  const Mar = data.filter((d) => d.Month === '03');
  const Apr = data.filter((d) => d.Month === '04');
  const May = data.filter((d) => d.Month === '05');
  const Jun = data.filter((d) => d.Month === '06');
  const Jul = data.filter((d) => d.Month === '07');
  const Aug = data.filter((d) => d.Month === '08');
  const Sep = data.filter((d) => d.Month === '09');
  const Oct = data.filter((d) => d.Month === '10');
  const Nov = data.filter((d) => d.Month === '11');
  const Dec = data.filter((d) => d.Month === '12');

  return {
    Jan,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec,
  };
};

// Maybe the undefined is not coming from the initial parsed array, but from one of the objects deeper in the code?
export const monthChecker = (data: CsvObject[]) => {
  const Jan = data.filter((d) => d.Month === '01');
  const Feb = data.filter((d) => d.Month === '02');
  const Mar = data.filter((d) => d.Month === '03');
  const Apr = data.filter((d) => d.Month === '04');
  const May = data.filter((d) => d.Month === '05');
  const Jun = data.filter((d) => d.Month === '06');
  const Jul = data.filter((d) => d.Month === '07');
  const Aug = data.filter((d) => d.Month === '08');
  const Sep = data.filter((d) => d.Month === '09');
  const Oct = data.filter((d) => d.Month === '10');
  const Nov = data.filter((d) => d.Month === '11');
  const Dec = data.filter((d) => d.Month === '12');

  console.log('Jan is valid: ' + singleMonth(Jan));
  console.log('Jun is valid: ' + singleMonth(Jun));

  const monthArr = [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec];

  console.log(monthArr);
};

const singleMonth = (month: CsvObject[]) => {
  return month[0]['MaxTemp(°C)'];
};
