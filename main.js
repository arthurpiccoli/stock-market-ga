const { readEntries } = require('./helpers/io.js');
const { predictNextDay } = require('./helpers/experiments.js');

const entriesFileName = "entries.txt";

let daysSample = 25;
let numOfGenerations = 10;
let numOfIndividualsPerPopulation = 100;

let entries = readEntries(entriesFileName).slice(-daysSample);

console.log(predictNextDay(entries, numOfGenerations, numOfIndividualsPerPopulation));

