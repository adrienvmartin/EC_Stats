export const averageHigh = (input) => {

  let janArray = [];
  let janTotal = 0;

  // Try January max temp only
  for (let i = 0; i < 31; i++) {
    janArray.push(Number(input[i]["MaxTemp(°C)"]));
  }

  for (let i = 0; i < janArray.length; i++) {
    janTotal += janArray[i];
  }

  console.log(`The highest high in January was: ${Math.max(...janArray)}`)
  console.log(`The lowest high in January was: ${Math.min(...janArray)}`)

  return janTotal / 31;
};
