export const monthParser = (data: []) => {
  const Jan: number[] = [];
  const Feb: number[] = [];

  for (let i = 0; i < 31; i++) {
    Jan.push(data[i]);
  }

  for (let i = 31; i < 28; i++) {
    Feb.push(data[i]);
  }

  return {
    Jan,
    Feb,
  };
};
