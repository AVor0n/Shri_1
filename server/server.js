const express = require('express')
const path = require("path");
const api = require('./controllers/api');
const { PORT, distFolder } = require('./config');

const app = express();

app.post('/upload', api.uploader, api.upload);
app.get('/merge', api.merge);

app.get('/list', api.getImages);
app.get('/image/:id', api.getImage);
app.delete('/image/:id', api.deleteImage);

app.get('*', (req, res) => {
  const filename = req.url.replace('/', '') || 'index.html'
  res.sendFile(path.join(distFolder, filename))
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
