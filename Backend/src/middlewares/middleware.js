const jwt = require('jsonwebtoken');
const jwtSecret = 'seuSegredoAqui';

const isAuthenticated = (req, res, next) => {
  // Tente obter o token do cookie
  const token = req.cookies.token;

  if (!token) {
      return res.status(401).json({ error: 'Token não fornecido.' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
          return res.status(401).json({ error: 'Token inválido.' });
      }

      req.user = decoded; // Aqui o req.user deve conter o nif do usuário entre outras informações
      next();
  });
};

const isBuyer = (req, res, next) => {
  if (req.user.iduser !== 2) {
    return res.status(403).json({ error: 'Acesso negado.' });
  }
  next();
};

const isManager = (req, res, next) => {
  if (req.user.iduser !== 3) {
    return res.status(403).json({ error: 'Acesso negado.' });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.iduser !== 1) {
    return res.status(403).json({ error: 'Acesso negado.' });
  }
  next();
};

module.exports = { isAuthenticated, isBuyer, isManager, isAdmin };



  