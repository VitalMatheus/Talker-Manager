const talkValidate = (require, response, next) => {
  const { talk } = require.body;

  if (!talk) {
    return response.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

module.exports = { talkValidate };