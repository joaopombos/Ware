var DataTypes = require("sequelize").DataTypes;
var _addons = require("./addons");
var _avaliacoes = require("../models2/avaliacoes");
var _clientes = require("../models2/clientes");
var _empresas = require("../models2/empresas");
var _licencasatribuidas = require("../models2/licencasatribuidas");
var _orcamentos = require("../models2/orcamentos");
var _pedidos = require("../models2/pedidos");
var _planos = require("../models2/planos");
var _softwaresadquiridos = require("../models2/softwaresadquiridos");
var _tickets = require("../models2/tickets");
var _tipossoftwares = require("../models2/tipossoftwares");
var _tipouser = require("../models2/tipouser");
var _ware = require("../models2/ware");

function initModels(sequelize) {
  var addons = _addons(sequelize, DataTypes);
  var avaliacoes = _avaliacoes(sequelize, DataTypes);
  var clientes = _clientes(sequelize, DataTypes);
  var empresas = _empresas(sequelize, DataTypes);
  var licencasatribuidas = _licencasatribuidas(sequelize, DataTypes);
  var orcamentos = _orcamentos(sequelize, DataTypes);
  var pedidos = _pedidos(sequelize, DataTypes);
  var planos = _planos(sequelize, DataTypes);
  var softwaresadquiridos = _softwaresadquiridos(sequelize, DataTypes);
  var tickets = _tickets(sequelize, DataTypes);
  var tipossoftwares = _tipossoftwares(sequelize, DataTypes);
  var tipouser = _tipouser(sequelize, DataTypes);
  var ware = _ware(sequelize, DataTypes);

  avaliacoes.belongsTo(addons, { as: "idavaliacao_addon", foreignKey: "idavaliacao"});
  addons.hasOne(avaliacoes, { as: "avaliaco", foreignKey: "idavaliacao"});
  addons.belongsTo(avaliacoes, { as: "idaddon_avaliaco", foreignKey: "idaddon"});
  avaliacoes.hasOne(addons, { as: "addon", foreignKey: "idaddon"});
  orcamentos.belongsTo(clientes, { as: "nif_cliente", foreignKey: "nif"});
  clientes.hasMany(orcamentos, { as: "orcamentos", foreignKey: "nif"});
  pedidos.belongsTo(clientes, { as: "nif_cliente", foreignKey: "nif"});
  clientes.hasMany(pedidos, { as: "pedidos", foreignKey: "nif"});
  tickets.belongsTo(clientes, { as: "nif_cliente", foreignKey: "nif"});
  clientes.hasMany(tickets, { as: "tickets", foreignKey: "nif"});
  clientes.belongsTo(empresas, { as: "emp_nif_empresa", foreignKey: "emp_nif"});
  empresas.hasMany(clientes, { as: "clientes", foreignKey: "emp_nif"});
  softwaresadquiridos.belongsTo(empresas, { as: "nif_empresa", foreignKey: "nif"});
  empresas.hasMany(softwaresadquiridos, { as: "softwaresadquiridos", foreignKey: "nif"});
  addons.belongsTo(orcamentos, { as: "idorcamento_orcamento", foreignKey: "idorcamento"});
  orcamentos.hasMany(addons, { as: "addons", foreignKey: "idorcamento"});
  planos.belongsTo(pedidos, { as: "idvenda_pedido", foreignKey: "idvenda"});
  pedidos.hasMany(planos, { as: "planos", foreignKey: "idvenda"});
  addons.belongsTo(planos, { as: "idplanos_plano", foreignKey: "idplanos"});
  planos.hasMany(addons, { as: "addons", foreignKey: "idplanos"});
  tipossoftwares.belongsTo(planos, { as: "idplanos_plano", foreignKey: "idplanos"});
  planos.hasMany(tipossoftwares, { as: "tipossoftwares", foreignKey: "idplanos"});
  licencasatribuidas.belongsTo(softwaresadquiridos, { as: "chaveproduto_softwaresadquirido", foreignKey: "chaveproduto"});
  softwaresadquiridos.hasMany(licencasatribuidas, { as: "licencasatribuidas", foreignKey: "chaveproduto"});
  addons.belongsTo(tipossoftwares, { as: "idproduto_tipossoftware", foreignKey: "idproduto"});
  tipossoftwares.hasMany(addons, { as: "addons", foreignKey: "idproduto"});
  avaliacoes.belongsTo(tipossoftwares, { as: "idproduto_tipossoftware", foreignKey: "idproduto"});
  tipossoftwares.hasMany(avaliacoes, { as: "avaliacos", foreignKey: "idproduto"});
  orcamentos.belongsTo(tipossoftwares, { as: "idproduto_tipossoftware", foreignKey: "idproduto"});
  tipossoftwares.hasMany(orcamentos, { as: "orcamentos", foreignKey: "idproduto"});
  clientes.belongsTo(tipouser, { as: "iduser_tipouser", foreignKey: "iduser"});
  tipouser.hasMany(clientes, { as: "clientes", foreignKey: "iduser"});
  addons.belongsTo(ware, { as: "idware_ware", foreignKey: "idware"});
  ware.hasMany(addons, { as: "addons", foreignKey: "idware"});

  return {
    addons,
    avaliacoes,
    clientes,
    empresas,
    licencasatribuidas,
    orcamentos,
    pedidos,
    planos,
    softwaresadquiridos,
    tickets,
    tipossoftwares,
    tipouser,
    ware,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
