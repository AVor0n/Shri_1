const { imageFolder } = require('../../config');
const path = require('path');
const fs = require('fs');
const db = require('../../entities/Database');

module.exports = (req, res) => {
  const id = req.params.id;
  const image = db.find(id);

  if (!image) {
    res.status(404).end('Not Found');
    return;
  }

  const imageExtention = '.' + image.mimetype.split('/')[1];
  res.header('Content-disposition', `attachment; filename=${id + imageExtention}`);
  res.header('Content-Type', image.mimetype);

  const imageStream = fs.createReadStream(path.resolve(imageFolder, id));
  imageStream.pipe(res);
};
