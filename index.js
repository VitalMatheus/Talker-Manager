const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const { readFile } = require('fs').promises;
const { randomUUID } = require('crypto');

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

app.get('/talker/:id', async (require, response) => {
  const { id } = require.params;
  try {
    const data = await readFile('./talker.json', 'utf8');
    const talkers = JSON.parse(data);
    const newData = talkers.find((talker) => talker.id === +id);
    console.log(newData);
    if (newData) return response.status(200).json(newData);
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return response.status(404).send(error.message);
  }
});

app.post('/login', (require, response) => {
  const token = randomUUID().split('-').join('').slice(0, 16);
  console.log(token);
  response.status(200).json({ token });
});

// new Date().getTime().toString().slice(0,16)

app.listen(PORT, () => {
  console.log('Online');
});
