const path = require('path');

const dbFolder = path.resolve(__dirname, '../database');
const dbDumpFile = path.resolve(dbFolder, 'dump.json');
const imageFolder = path.resolve(dbFolder, 'images');
const distFolder = path.resolve(__dirname, '../dist');

module.exports = {
  PORT: 8080,

  dbFolder,
  dbDumpFile,
  imageFolder,
  distFolder,
};
