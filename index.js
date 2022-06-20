const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const { readFile } = require('fs').promises;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_require, response) => {
  try {
    const data = await readFile('./talker.json', 'utf8');
    const talker = JSON.parse(data);
    if (!talker) {
      return response.status(HTTP_OK_STATUS).send([]);
    }
    return response.status(HTTP_OK_STATUS).send(talker);
  } catch (error) {
    return response.status(400).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
