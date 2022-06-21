const { writeFile } = require('fs').promises;

const writeFiles = async (data) => {
  await writeFile('./talker.json', JSON.stringify(data));
};

module.exports = writeFiles;