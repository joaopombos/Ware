const { DataTypes } = require('sequelize');
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
  const Addons = defineAddons(sequelize, DataTypes);
  const Avaliacoes = defineAvaliacoes(sequelize, DataTypes);
  const Clientes = defineClientes(sequelize, DataTypes);
  const Empresas = defineEmpresas(sequelize, DataTypes);
  const LicencasAtribuidas = defineLicencasAtribuidas(sequelize, DataTypes);
  const Orcamentos = defineOrcamentos(sequelize, DataTypes);
  const Pedidos = definePedidos(sequelize, DataTypes);
  const Planos = definePlanos(sequelize, DataTypes);
  const SoftwaresAdquiridos = defineSoftwaresAdquiridos(sequelize, DataTypes);
  const Tickets = defineTickets(sequelize, DataTypes);
  const TiposSoftwares = defineTiposSoftwares(sequelize, DataTypes);
  const TipoUser = defineTipoUser(sequelize, DataTypes);
  const Ware = defineWare(sequelize, DataTypes);
  

  // Define relationships heree
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

  return {
    Addons,
    Avaliacoes,
    Orcamentos,
    Empresas,
    LicencasAtribuidas,
    Pedidos,
    Planos,
    SoftwaresAdquiridos,
    Tickets,
    TiposSoftwares,
    TipoUser,
    Clientes,
    Ware,
  };
}

module.exports = initModels;

