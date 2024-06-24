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
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
}

syncModels().then(() => {
  app.listen(port, () => {
  });
});

module.exports = app;
