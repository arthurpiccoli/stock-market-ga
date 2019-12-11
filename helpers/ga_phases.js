function fitness(value, average, stdDeviation) {
  return Math.abs(1 / ((average - value) / stdDeviation))
}

function initialPopulation(entries, average, stdDeviation) {
  let population = [];

  let fitnessSum = 0.0;

  entries.forEach((entry) => {
    let entryFitness = fitness(entry, average, stdDeviation);

    let individual = { 'value': entry, 'fitness': entryFitness, fitnessSum }

    population.push(individual);

    fitnessSum += entryFitness;
  });
  
  let generation = { population, fitnessSum };

  return generation;
}

function select(population, fitnessSum) {
  let randomNumber = Math.random() * fitnessSum;

  let selectedIndividual;

  population.forEach((individual) => {
    if (individual.fitnessSum < randomNumber) {
      selectedIndividual = individual;
    } else {
      return;
    }
  });

  return selectedIndividual;
}

function mutation(value, stdDeviation) {
  let randomNumber = Math.random();

  if (randomNumber >= 0.975) {
    value += stdDeviation;
  } else if (randomNumber >= 0.95) {
    value -= stdDeviation;
  }
  return value;
}

function mate(population, fitnessSum, newFitnessSum, average, stdDeviation) {
  let firstParent = select(population, fitnessSum);
  let secondParent = select(population, fitnessSum);

  let childValue = (firstParent.value + secondParent.value) / 2;

  childValue = mutation(childValue, stdDeviation);

  let childFitness = fitness(childValue, average, stdDeviation);

  let newIndividual = { 'value': childValue, 'fitness': childFitness, 'fitnessSum': newFitnessSum }

  return newIndividual;
}

function findTheBest(generation) {
  let bestIndividual;
  let bestFit = 0.0;
  generation.population.forEach((individual) => {
    if (individual.fitness >= bestFit) {
      bestIndividual = individual;
      bestFit = individual.fitness;
    }
  });
  return bestIndividual;
}

module.exports = { initialPopulation, mate, findTheBest }
