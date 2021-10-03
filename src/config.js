const path = require('path');

const dbFolder = path.resolve(__dirname, '../database/');
const dbDumpFile = path.resolve(dbFolder, 'dump.json');
const imageFolder = path.resolve(dbFolder, 'images');

module.exports = {
  PORT: 8080,

  dbFolder,
  dbDumpFile,
  imageFolder,
};
