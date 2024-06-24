const express = require('express');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const sequelize = require('./src/models/database');
const initModels = require('./src/models/init-models'); // Ajuste o caminho conforme necessário
const DataTypes = require('sequelize').DataTypes; // Importar DataTypes do Sequelize
const TipoUser = require('./src/models/tipouser')(sequelize, DataTypes); // Passar sequelize e DataTypes para tipouser
const rotas = require('./src/routes/WareRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// Configurações
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Configurar CORS (se necessário)
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
    // Sincroniza os modelos com o banco de dados
    await sequelize.sync({ force: true }); // Use { force: true } para recriar as tabelas a cada inicialização (apenas para desenvolvimento)
    console.log('Modelos sincronizados com o banco de dados.');

    console.log('Inserindo tipos de usuário...');
    // Inserir tipos de usuário se ainda não existirem
    await models.TipoUser.bulkCreate([
      { iduser: 1, designacao: 'Admin' },
      { iduser: 2, designacao: 'Comprador_Gestor' },
      { iduser: 3, designacao: 'Gestor' }
    ], { ignoreDuplicates: true }); // Ignora inserções duplicadas

    console.log('Tipos de usuário inseridos com sucesso.');

  } catch (error) {
    console.error('Erro ao sincronizar o modelo ou inserir tipos de usuário:', error);
    process.exit(1); // Encerra o processo com erro
  }

  // Inicia o servidor após sincronizar e inserir os dados necessários
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
}

// Chama a função para inicializar o servidor
inicializarServidor();





