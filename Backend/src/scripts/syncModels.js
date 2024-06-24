const sequelize = require('../models/database');
const Clientes = require('../models/clientes');
const Empresas = require('../models/empresas');
const TipoUser = require('../models/tipouser');
const Addons = require('../models/addons');
const Avaliacoes = require('../models/avaliacoes');
const LicencasAtribuidas = require('../models/licencasatribuidas');
const Orcamentos = require('../models/orcamentos');
const Pedidos = require('../models/pedidos');
const Planos = require('../models/planos');
const SoftwaresAdquiridos = require('../models/softwaresadquiridos');
const Tickets = require('../models/tickets');
const TiposSoftwares = require('../models/tipossoftwares');
const Ware = require('../models/ware');

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

syncModels();
