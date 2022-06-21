const rateValidate = (require, response, next) => {
  const { talk: { rate } } = require.body;
  
  if (rate < 1 || rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) {
    return response.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
};

module.exports = { rateValidate };