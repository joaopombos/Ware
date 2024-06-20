function isAuthenticated(req, res, next) {
    if (req.session.user) {
      return next();
    } else {
      res.status(401).send('Precisa de iniciar sessão para aceder!');
    }
  }
  
  function isBuyer(req, res, next) {
    if (req.session.user && req.session.tipouser.iduser === 2) {
      return next();
    } else {
      res.status(403).send('Acesso negado.');
    }
  }
  
  function isManager(req, res, next) {
    if (req.session.user && req.session.tipouser.iduser === 3) {
      return next();
    } else {
      res.status(403).send('Acesso negado.');
    }
  }
  
  function isAdmin(req, res, next) {
    if (req.session.user && req.session.tipouser.iduser === 1) {
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
  