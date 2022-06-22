const tokenValidate = (require, response, next) => {
  const { authorization } = require.headers;
  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  return next();
};

module.exports = { tokenValidate };