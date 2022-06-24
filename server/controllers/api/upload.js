const multer = require('multer');
const Jpeg = require('../../entities/image');
const db = require('../../entities/Database');
const { imageFolder } = require('../../config');
const { generateId } = require('../../utils/generateId');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageFolder);
  },
  filename: function (req, file, cb) {
    cb(null, generateId());
  },
});

module.exports = {
  uploader: multer({ storage: storage }).single('file'),

  upload: (req, res) => {
    const { filename, size, mimetype } = req.file;
    const image = new Jpeg(filename, size, mimetype);

    db.insert(image);
    res.json({ id: image.id });
  },
};
