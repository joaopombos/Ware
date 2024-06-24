const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const router = require('../Backend/src/routes/WareRoutes');
const sequelize = require('./src/models/database');

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
app.use(cors());
app.use('/', router);

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

// Inicializar modelo
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
    console.error("Error synchronizing models:", error);
  }
}

syncModels().then(() => {
  app.listen(port, () => {
  });
});

module.exports = app;
