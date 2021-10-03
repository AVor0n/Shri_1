const path = require('path');
const fs = require('fs');
const { imageFolder } = require('../config');

module.exports = class Jpeg {
  constructor(id, size, mimetype, createdAt) {
    this.id = id;
    this.size = size;
    this.mimetype = mimetype;
    this.createdAt = createdAt || Date.now();
  }

  async removeOriginal() {
    const fileName = this.id;
    fs.unlink(path.resolve(imageFolder, fileName), (err) => {
      if (err) throw err;
    });
  }

  toPublicJSON() {
    return {
      id: this.id,
      size: this.size,
      createdAt: this.createdAt,
    };
  }

  toJSON() {
    return {
      id: this.id,
      size: this.size,
      createdAt: this.createdAt,
      mimetype: this.mimetype,
    };
  }
};
