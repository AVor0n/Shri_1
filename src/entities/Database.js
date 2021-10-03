const { EventEmitter } = require('events');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString');
const { dbDumpFile } = require('../config');
const { writeFile, existsSync } = require('fs');

const Image = require('./image');

class Database extends EventEmitter {
  constructor() {
    super();
    this.idToImage = {};
  }

  insert(image) {
    this.idToImage[image.id] = image;
    this.emit('changed');
  }

  find(id) {
    const imageRaw = this.idToImage[id];

    if (!imageRaw) return null;
    else return imageRaw;
  }

  async remove(id) {
    const image = this.idToImage[id];

    await image.removeOriginal();
    delete this.idToImage[id];

    this.emit('changed');
  }

  async initFromDump() {
    if (!existsSync(dbDumpFile)) {
      return;
    }

    const dump = require(dbDumpFile);

    if (typeof dump.idToImage === 'object') {
      this.idToImage = {};

      for (let id in dump.idToImage) {
        const image = dump.idToImage[id];
        this.idToImage[id] = new Image(image.id, image.size, image.mimetype);
      }
    }
  }

  toJSON() {
    return {
      idToImage: this.idToImage,
    };
  }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()), (error) => {
    if (error) throw error;
  });
});

module.exports = db;
