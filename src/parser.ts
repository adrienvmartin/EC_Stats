export const monthParser = (data: []) => {
  // Add check for leap years

  const Jan = data.slice(0, 31);
  const Feb = data.slice(31, 60);
  const Mar = data.slice(60, 91);
  const Apr = data.slice(91, 121);
  const May = data.slice(121, 152);
  const Jun = data.slice(152, 182);
  const Jul = data.slice(182, 213);
  const Aug = data.slice(213, 244);
  const Sep = data.slice(244, 274);
  const Oct = data.slice(274, 305);
  const Nov = data.slice(305, 335);
  const Dec = data.slice(335, 366);

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

export interface Months {
  Jan: {}[];
  Feb: {}[];
  Mar: {}[];
  Apr: {}[];
  May: {}[];
  Jun: {}[];
  Jul: {}[];
  Aug: {}[];
  Sep: {}[];
  Oct: {}[];
  Nov: {}[];
  Dec: {}[];
}
