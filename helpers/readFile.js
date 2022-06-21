const { readFile } = require('fs').promises;

const readFiles = async () => {
  const data = await readFile('./talker.json', 'utf8');
  return JSON.parse(data);
};

module.exports = readFiles;