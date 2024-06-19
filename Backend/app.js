const express = require('express');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const sequelize = require('./src/models/database');
const pool = require('../Backend/src/models/database'); 
const rotas = require('./src/routes/WareRoutes');

const app = express();

// Configurações
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Configurar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allows', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Configurar sessão
app.use(session({
  store: new PgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: 'seuSegredoAqui',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Defina como true em produção com HTTPS
}));

// Rotas
app.use(rotas);

// Sincronizar modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o modelo:', err);
  });

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor iniciado na porta " + PORT);
});
