export const averageHigh = (input) => {

  let avgArray = [];

  // console.log(`INITIAL Parser result: ${result}\nINITIAL Parser average: ${average}`);

  for (let i = 0; i < input.length; i++) {
    avgArray.push(input[i]["MaxTemp(°C)"]);
  }
  
  let total = 0;
  for (let i = 0; i < avgArray.length; i++) {
    total += avgArray[i];
  }
  
  const result = total / avgArray.length;
  console.log(`FINAL Parser average: ${result}`);

  return result;
};
