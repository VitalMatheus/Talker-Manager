const watchedAtValidate = (require, response, next) => {
  const { talk: { watchedAt } } = require.body;
  
  if (!watchedAt) {
    return response.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  const regex = /(0[1-9]|[12][0-9]|3[01])[ /.](0[1-9]|1[012])[ /.](19|20)\d\d$/g;
  if (!regex.test(watchedAt)) {
    return response.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = { watchedAtValidate };