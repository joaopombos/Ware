const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Ajuste o caminho conforme necessário

const defineAddons = require('./addons');
const defineAvaliacoes = require('./avaliacoes');
const defineClientes = require('./clientes');
const defineEmpresas = require('./empresas');
const defineLicencasAtribuidas = require('./licencasatribuidas');
const defineOrcamentos = require('./orcamentos');
const definePedidos = require('./pedidos');
const definePlanos = require('./planos');
const defineSoftwaresAdquiridos = require('./softwaresadquiridos');
const defineTickets = require('./tickets');
const defineTiposSoftwares = require('./tipossoftwares');
const defineTipoUser = require('./tipouser');
const defineWare = require('./ware');

function initModels(sequelize) {
  console.log('Definindo modelos...');

  const Addons = defineAddons(sequelize, DataTypes);
  console.log('Modelo Addons definido.');
  const Avaliacoes = defineAvaliacoes(sequelize, DataTypes);
  console.log('Modelo Avaliacoes definido.');
  const Clientes = defineClientes(sequelize, DataTypes);
  console.log('Modelo Clientes definido.');
  const Empresas = defineEmpresas(sequelize, DataTypes);
  console.log('Modelo Empresas definido.');
  const LicencasAtribuidas = defineLicencasAtribuidas(sequelize, DataTypes);
  console.log('Modelo LicencasAtribuidas definido.');
  const Orcamentos = defineOrcamentos(sequelize, DataTypes);
  console.log('Modelo Orcamentos definido.');
  const Pedidos = definePedidos(sequelize, DataTypes);
  console.log('Modelo Pedidos definido.');
  const Planos = definePlanos(sequelize, DataTypes);
  console.log('Modelo Planos definido.');
  const SoftwaresAdquiridos = defineSoftwaresAdquiridos(sequelize, DataTypes);
  console.log('Modelo SoftwaresAdquiridos definido.');
  const Tickets = defineTickets(sequelize, DataTypes);
  console.log('Modelo Tickets definido.');
  const TiposSoftwares = defineTiposSoftwares(sequelize, DataTypes);
  console.log('Modelo TiposSoftwares definido.');
  const TipoUser = defineTipoUser(sequelize, DataTypes);
  console.log('Modelo TipoUser definido.');
  const Ware = defineWare(sequelize, DataTypes);
  console.log('Modelo Ware definido.');

  // Definição das relações
  console.log('Definindo relações...');
  Avaliacoes.belongsTo(Addons, { as: "idavaliacao_addon", foreignKey: "idavaliacao" });
  Addons.hasOne(Avaliacoes, { as: "avaliaco", foreignKey: "idavaliacao" });
  Addons.belongsTo(Avaliacoes, { as: "idaddon_avaliaco", foreignKey: "idaddon" });
  Avaliacoes.hasOne(Addons, { as: "addon", foreignKey: "idaddon" });
  Orcamentos.belongsTo(Clientes, { as: "nif_cliente", foreignKey: "nif" });
  Clientes.hasMany(Orcamentos, { as: "orcamentos", foreignKey: "nif" });
  Pedidos.belongsTo(Clientes, { as: "nif_cliente", foreignKey: "nif" });
  Clientes.hasMany(Pedidos, { as: "pedidos", foreignKey: "nif" });
  Tickets.belongsTo(Clientes, { as: "nif_cliente", foreignKey: "nif" });
  Clientes.hasMany(Tickets, { as: "tickets", foreignKey: "nif" });
  Clientes.belongsTo(Empresas, { as: "emp_nif_empresa", foreignKey: "emp_nif" });
  Empresas.hasMany(Clientes, { as: "clientes", foreignKey: "emp_nif" });
  SoftwaresAdquiridos.belongsTo(Empresas, { as: "nif_empresa", foreignKey: "nif" });
  Empresas.hasMany(SoftwaresAdquiridos, { as: "softwaresadquiridos", foreignKey: "nif" });

  console.log('Relações definidas.');

  // Inicialize outros modelos e defina suas relações aqui

  return {
    Addons,
    Avaliacoes,
    Clientes,
    Empresas,
    LicencasAtribuidas,
    Orcamentos,
    Pedidos,
    Planos,
    SoftwaresAdquiridos,
    Tickets,
    TiposSoftwares,
    TipoUser,
    Ware,
  };
}

module.exports = initModels;

