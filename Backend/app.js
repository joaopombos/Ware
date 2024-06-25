const express = require('express');
const cors = require('cors');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pool = require('../Backend/src/models/database');
const app = express();
const port = 3000;
const rotas = require('./src/routes/WareRoutes');
const sequelize = require('./src/models/database');
const cookieParser = require('cookie-parser');

const Clientes = require('../Backend/src/models/clientes');
const Empresas = require('../Backend/src/models/empresas');
const TipoUser = require('../Backend/src/models/tipouser');
const Addons = require('../Backend/src/models/addons');
const Avaliacoes = require('../Backend/src/models/avaliacoes');
const LicencasAtribuidas = require('../Backend/src/models/licencasatribuidas');
const Orcamentos = require('../Backend/src/models/orcamentos');
const Pedidos = require('../Backend/src/models/pedidos');
const Planos = require('../Backend/src/models/planos');
const SoftwaresAdquiridos = require('../Backend/src/models/softwaresadquiridos');
const Tickets = require('../Backend/src/models/tickets');
const TiposSoftwares = require('../Backend/src/models/tipossoftwares');
const Ware = require('../Backend/src/models/ware');

app.use(express.json());

async function syncModels() {
  try {
    await Empresas.sync();
    await TipoUser.sync();
    await Clientes.sync();
    await Pedidos.sync();
    await Planos.sync();
    await Ware.sync();
    await TiposSoftwares.sync();
    await SoftwaresAdquiridos.sync();
    await Tickets.sync();
    await Orcamentos.sync();
    await LicencasAtribuidas.sync();
    await Addons.sync();
    await Avaliacoes.sync();

    console.log("All models were synchronized successfully.");

    // Inserir dados iniciais na tabela TipoUser
    await TipoUser.bulkCreate([
      { iduser: 1, designacao: 'Comprador_Gestor' },
      { iduser: 2, designacao: 'Gestor' }
    ], {
      ignoreDuplicates: true // Ignorar duplicados se já existirem
    });

    console.log("Initial data for TipoUser inserted successfully.");

    // Inserir dados iniciais na tabela Ware
    await Ware.bulkCreate([
      { idware: 1, username: 'admin', password: 'admin', lucros: 0, gastos: 0 }
    ], {
      ignoreDuplicates: true // Ignorar duplicados se já existirem
    });

    console.log("Initial data for Ware inserted successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
}

// Configurações
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Configurar CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Permitir requisições do frontend React
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Permitir envio de cookies
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
  cookie: { secure: false } // Para testes locais sem HTTPS
}));

// Rotas
app.use(rotas);

// Sincronizar modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados.');
    return syncModels(); // Chama a função de sincronização dos modelos e inserção dos dados
  })
  .catch(err => {
    console.error('Erro ao sincronizar o modelo:', err);
  });

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor iniciado na porta " + PORT);
});

module.exports = app;


