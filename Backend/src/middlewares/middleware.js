function isAuthenticated(req, res, next) {
    if (req.session.user) {
      return next();
    } else {
      res.status(401).send('Você precisa estar logado para acessar esta rota.');
    }
  }
  
  function isBuyer(req, res, next) {
    if (req.session.user && req.session.user.role === 2) {
      return next();
    } else {
      res.status(403).send('Acesso negado.');
    }
  }
  
  function isManager(req, res, next) {
    if (req.session.user && req.session.user.role === 3) {
      return next();
    } else {
      res.status(403).send('Acesso negado.');
    }
  }
  
  function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 1) {
      return next();
    } else {
      res.status(403).send('Acesso negado.');
    }
  }
  
  module.exports = {
    isAuthenticated,
    isBuyer,
    isManager,
    isAdmin
  };
  