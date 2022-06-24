const db = require('../../entities/Database');

module.exports = async (req, res) => {
  const id = req.params.id;

  if (!db.find(id)) {
    res.status(404).end('Not Found');
    return;
  }

  await db.remove(id);
  res.json({ id: id });
};
