function getAverage(entries) {
  let nElements = entries.length;

  let sum = entries.reduce((acc, num) => acc + num);

  return sum / nElements;
}

function getStdDeviation(entries, average) {
  let nElements = entries.length;

  let sumOfSquares = entries.reduce(
    (acc, num) => acc + Math.pow(num - average, 2)
  );

  return Math.sqrt(sumOfSquares / nElements);
}

module.exports = { getAverage, getStdDeviation }
