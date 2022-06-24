const db = require('../../entities/Database');
const image = require('../../entities/image');

module.exports = (req, res) => {
  const images = [];
  for (let id in db.idToImage) {
    const image = db.find(id);
    images.push(image.toPublicJSON());
  }
  res.json(images);
};
