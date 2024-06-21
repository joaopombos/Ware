const jwt = require('jsonwebtoken');

const jwtSecret = 'seuSegredoAqui'; // Chave secreta para assinatura do token

function isAuthenticated(req, res, next) {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).send('Precisa iniciar sessão para aceder!');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;

    // Verificar se o token decodificado contém o nif do usuário
    if (!decoded.id) {
      return res.status(401).send('Token inválido. Faça login novamente.');
    }

    // Continuar com a próxima função middleware
    return next();
  } catch (error) {
    return res.status(401).send('Token inválido ou expirado. Faça login novamente.');
  }
}

function isBuyer(req, res, next) {
  isAuthenticated(req, res, () => {
    if (req.user && req.user.role === 2) {
      return next();
    } else {
      return res.status(403).send('Acesso negado.');
    }
  });
}

function isManager(req, res, next) {
  isAuthenticated(req, res, () => {
    if (req.user && req.user.role === 3) {
      return next();
    } else {
      return res.status(403).send('Acesso negado.');
    }
  });
}

function isAdmin(req, res, next) {
  isAuthenticated(req, res, () => {
    if (req.user && req.user.role === 1) {
      return next();
    } else {
      return res.status(403).send('Acesso negado.');
    }
  });
}

module.exports = {
  isAuthenticated,
  isBuyer,
  isManager,
  isAdmin
};

  