const fs = require('fs');

function readEntries(fileName) {
  let entries = fs.readFileSync(fileName).toString().split("\n");
  return entries.map(e => parseFloat(e));
}

module.exports = { readEntries }
