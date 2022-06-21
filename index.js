const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const crypto = require('crypto');

const readFiles = require('./helpers/readFile');
const writeFiles = require('./helpers/writeFile');

const { loginValidate } = require('./middleware/loginValidate');
const { tokenValidate } = require('./middleware/tokenValidate');
const { nameValidate } = require('./middleware/nameValidate');
const { ageValidate } = require('./middleware/ageValidate');
const { talkValidate } = require('./middleware/talkValidate');
const { watchedAtValidate } = require('./middleware/watchedAtValidate');
const { rateValidate } = require('./middleware/rateValidate');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_require, response) => {
  try {
    const data = await readFiles();
    if (!data) {
      return response.status(HTTP_OK_STATUS).send([]);
    }
    return response.status(HTTP_OK_STATUS).send(data);
  } catch (error) {
    return response.status(400).send(error.message);
  }
});

app.get('/talker/:id', async (require, response) => {
  const { id } = require.params;
  try {
    const data = await readFiles();
    const talkers = data.find((talker) => talker.id === +id);
    if (talkers) return response.status(200).json(talkers);
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    return response.status(404).send(error.message);
  }
});

app.post('/login', loginValidate, (_require, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  return response.status(200).json({ token });
});

app.post('/talker',
tokenValidate,
nameValidate,
ageValidate,
talkValidate,
rateValidate,
watchedAtValidate,
async (require, response) => {
  const { name, age, talk } = require.body;
    try {
      const talkers = await readFiles();
      console.log(talkers.length);
      const newTalker = { id: talkers.length + 1, name, age, talk };
      // console.log('newtalker: ', newTalker, typeof newTalker);
      talkers.push(newTalker);
      await writeFiles(talkers);
      return response.status(201).json(newTalker); 
    } catch (error) {
      return response.status(400).send(error.message);
    }
});

app.listen(PORT, () => {
  console.log('Online');
});
