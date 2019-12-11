const { getAverage, getStdDeviation } = require('./math.js');
const { initialPopulation, mate, findTheBest } = require('./ga_phases.js');

function createNewGeneration(previousGeneration, average, stdDeviation, numOfIndividualsPerPopulation) {
  let newFitnessSum = 0.0;
  let newPopulation = [];

  for (let individualIndex = 0; individualIndex < numOfIndividualsPerPopulation; individualIndex++) {
    let newIndividual = mate(
      previousGeneration.population, previousGeneration.fitnessSum, newFitnessSum, average, stdDeviation
    );
    newFitnessSum += newIndividual.fitness;
    newPopulation.push(newIndividual)
  }

  let newGeneration = { 'population': newPopulation, 'fitnessSum': newFitnessSum };

  return newGeneration;
}

function craeteAllGenerations(numOfGenerations, entries, average, stdDeviation, numOfIndividualsPerPopulation) {
  let generations = [];

  let population = initialPopulation(entries, average, stdDeviation);

  generations.push(population);

  for (let iteration = 0; iteration < numOfGenerations; iteration++) {
    let previousGeneration = generations[iteration];

    let newGeneration = createNewGeneration(
      previousGeneration, average, stdDeviation, numOfIndividualsPerPopulation
    )

    generations.push(newGeneration);
  }

  return generations;
}

function predictNextDay(entries, numOfGenerations, numOfIndividualsPerPopulation) {
  let average = getAverage(entries);
  let stdDeviation = getStdDeviation(entries, average);

  let generations = craeteAllGenerations(
    numOfGenerations, entries, average, stdDeviation, numOfIndividualsPerPopulation
  )

  return findTheBest(generations[numOfGenerations - 1]);
}

module.exports = { predictNextDay }
