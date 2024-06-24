const express = require('express');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const sequelize = require('./src/models/database');
const initModels = require('./src/models/init-models');
const rotas = require('./src/routes/WareRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// Configurações
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(cookieParser());

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
    pool: sequelize,
    tableName: 'session'
  }),
  secret: 'seuSegredoAqui',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Para testes locais sem HTTPS
}));

// Rota
app.use(rotas);

// Inicializar modelos
const models = initModels(sequelize);
console.log('Modelos inicializados:', Object.keys(models));

// Sincronizar modelos com o banco de dados e inserir tipos de usuário
async function inicializarServidor() {
  try {
    console.log('Iniciando sincronização dos modelos...');
    await sequelize.sync({ force: true }); // Use { force: true } for development only
    console.log('Modelos sincronizados com o banco de dados.');

    console.log('Inserindo tipos de usuário...');
    await models.TipoUser.bulkCreate([
      { iduser: 1, designacao: 'Admin' },
      { iduser: 2, designacao: 'Comprador_Gestor' },
      { iduser: 3, designacao: 'Gestor' }
    ], { ignoreDuplicates: true });
    console.log('Tipos de usuário inseridos com sucesso.');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao sincronizar o modelo ou inserir tipos de usuário:', error);
    process.exit(1);
  }
}

// Chama a função para inicializar o servidor
inicializarServidor();
