const express = require('express');
const api = require('./controllers/api');
const { PORT } = require('./config');

const app = express();

app.post('/upload', api.uploader, api.upload);
app.get('/merge', api.merge);

app.get('/list', api.getImages);
app.get('/image/:id', api.getImage);
app.delete('/image/:id', api.deleteImage);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
