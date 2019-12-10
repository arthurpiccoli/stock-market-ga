let entries = [
  28.4,
  28.530001,
  28.18,
  27.83,
  27.68,
  27.51,
  27.440001,
  27.49,
  27.52,
  27.35,
  26.889999,
  26.139999,
  26.379999,
  26.24,
  26.08,
  26.25,
  26.52,
  25.549999,
  25.879999,
  25.6,
  26.35,
  26.280001,
  25.65,
  25.790001,
  24.92,
  24.23,
  23.91,
  24.030001,
  24.02,
  25.450001,
  25.219999,
  24.280001,
  23.959999,
  24.34,
  24.59,
  25.5,
  25.5,
  25.299999,
  25.6,
  26.26,
  26.389999,
  26.52,
  26.93,
  27.1,
  26.870001,
  27.059999,
  26.879999,
  28.059999,
  27.690001,
  27.219999,
  27.290001,
  27,
  27.48,
  27.27,
  27.34,
  27.700001,
  27.66,
  27.549999,
  27.51,
  26.719999,
  26.74,
  26.51,
  26.17,
  26.02,
  26.52,
  26.74,
  27.26,
  27.309999,
  27.6,
  27.93,
  27.66,
  27.6,
  27.77,
  28.57,
  28.950001,
  28.32,
  29.25,
  29.6,
  29.82,
  30.08,
  30.389999,
  30.43,
  30.360001,
  29.65,
  29.709999,
  30.9,
  30.02,
  30.450001,
  30.02,
  29.9,
  29.299999,
  29.08,
  28.780001,
  29.85,
  29.98,
  29.73,
  29.190001,
  29.33,
  29.530001,
  29.15,
];

function getAverage(entries) {
  let lastEntries = entries.slice(-daysSample);

  let average = 0.0;
  lastEntries.forEach((entry) => {
    average += entry;
  });

  return average / daysSample;
}

function getStdDeviation(entries, average) {
  let lastEntries = entries.slice(-daysSample);

  let stdDeviation = 0.0;
  lastEntries.forEach((entry) => {
    stdDeviation += Math.pow((entry - average), 2);
  });

  return Math.sqrt(stdDeviation / daysSample);
}

function initialize(entries, average, stdDeviation) {
  let population = [];

  let fitnessSum = 0.0;

  entries.forEach((entry) => {
    let fitness = Math.abs(1 / ((average - entry) / stdDeviation));

    let individual = { 'value': entry, fitness, fitnessSum }

    population.push(individual);

    fitnessSum += fitness;
  });
  let generation = {
    population,
    fitnessSum
  }
  return generation;
}

function select(population, fitnessSum) {
  let random = Math.random() * fitnessSum;

  let selectedIndividual;

  population.forEach((individual) => {

    if (individual.fitnessSum < random) {
      selectedIndividual = individual;
    } else {
      return;
    }
  });

  return selectedIndividual;
}

function mutation(value) {
  let random = Math.random();
  if (random >= 0.975) {

    value += stdDeviation;
  } else if (random >= 0.95) {
    value -= stdDeviation;
  }
  return value;
}

function mate(population, fitnessSum, newFitnessSum) {
  let firstParent = select(population, fitnessSum);
  let secondParent = select(population, fitnessSum);

  let childValue = (firstParent.value + secondParent.value) / 2;

  childValue = mutation(childValue);

  let childFitness = Math.abs(1 / ((average - childValue) / stdDeviation));

  let newIndividual = { 'value': childValue, 'fitness': childFitness, 'fitnessSum': newFitnessSum }

  return newIndividual;
}

let daysSample = 10;

let average = getAverage(entries)

let stdDeviation = getStdDeviation(entries, average)

let generations = [];

generations.push(initialize(entries, average, stdDeviation));

var generationsCount;
for (generationsCount = 1; generationsCount <= 10; generationsCount++) {
  let newFitnessSum = 0.0;
  let newPopulation = [];
  let previousGeneration = generations[generationsCount - 1];

  let individualsCount;
  for (individualsCount = 0; individualsCount < 100; individualsCount++) {
    let newIndividual = mate(previousGeneration.population, previousGeneration.fitnessSum, newFitnessSum);
    newFitnessSum += newIndividual.fitness;
    newPopulation.push(newIndividual)
  }
  let newGeneration = {
    'population': newPopulation,
    'fitnessSum': newFitnessSum
  }
  generations.push(newGeneration);
}

let bestIndividual;
let bestFit = 0.0;
generations[generationsCount - 1].population.forEach((individual) => {
  if (individual.fitness >= bestFit) {
    bestIndividual = individual;
    bestFit = individual.fitness;
  }
});

//CHANGE TO RETURN
console.log(bestIndividual);
