const path = require('path');
const fs = require('fs');
const { imageFolder } = require('../../config');
const backrem = require('backrem');
const db = require('../../entities/Database');

module.exports = async (req, res) => {
  const frontId = req.query.front;
  const backId = req.query.back;

  if (!db.find(frontId) || !db.find(backId)) {
    res.status(404).end('Not Found');
    return;
  }
  const frontStream = fs.createReadStream(path.resolve(imageFolder, frontId));
  const backStream = fs.createReadStream(path.resolve(imageFolder, backId));
  const [r, g, b] = req.query.color ? req.query.color.split(',').map((x) => +x) : undefined;
  const threshold = req.query.threshold ? +req.query.threshold : undefined;

  backrem
    .replaceBackground(frontStream, backStream, [r, g, b], threshold)
    .then((readableStream) => {
      readableStream.pipe(res);
    })
    .then(() => {
      const image = db.find(frontId);
      const imageType = image.mimetype.split('/')[1];

      res.header('Content-disposition', `attachment; filename=result.${imageType}`);
      res.header('Content-Type', image.mimetype);
      return res.download;
    });
};
