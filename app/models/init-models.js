var DataTypes = require("sequelize").DataTypes;
var _avaliacoes = require("./avaliacoes");
var _clientes = require("./clientes");
var _empresas = require("./empresas");
var _licencasatribuidas = require("./licencasatribuidas");
var _orcamentos = require("./orcamentos");
var _pedidos = require("./pedidos");
var _planos = require("./planos");
var _relationship_18 = require("./relationship_18");
var _softwaresadquiridos = require("./softwaresadquiridos");
var _tickets = require("./tickets");
var _tipossoftwares = require("./tipossoftwares");
var _tipouser = require("./tipouser");
var _ware = require("./ware");

function initModels(sequelize) {
  var avaliacoes = _avaliacoes(sequelize, DataTypes);
  var clientes = _clientes(sequelize, DataTypes);
  var empresas = _empresas(sequelize, DataTypes);
  var licencasatribuidas = _licencasatribuidas(sequelize, DataTypes);
  var orcamentos = _orcamentos(sequelize, DataTypes);
  var pedidos = _pedidos(sequelize, DataTypes);
  var planos = _planos(sequelize, DataTypes);
  var relationship_18 = _relationship_18(sequelize, DataTypes);
  var softwaresadquiridos = _softwaresadquiridos(sequelize, DataTypes);
  var tickets = _tickets(sequelize, DataTypes);
  var tipossoftwares = _tipossoftwares(sequelize, DataTypes);
  var tipouser = _tipouser(sequelize, DataTypes);
  var ware = _ware(sequelize, DataTypes);

  clientes.belongsToMany(tipouser, { as: 'iduser_tipousers', through: relationship_18, foreignKey: "nif", otherKey: "iduser" });
  tipouser.belongsToMany(clientes, { as: 'nif_clientes', through: relationship_18, foreignKey: "iduser", otherKey: "nif" });
  orcamentos.belongsTo(clientes, { as: "nif_cliente", foreignKey: "nif"});
  clientes.hasMany(orcamentos, { as: "orcamentos", foreignKey: "nif"});
  pedidos.belongsTo(clientes, { as: "nif_cliente", foreignKey: "nif"});
  clientes.hasMany(pedidos, { as: "pedidos", foreignKey: "nif"});
  relationship_18.belongsTo(clientes, { as: "nif_cliente", foreignKey: "nif"});
  clientes.hasMany(relationship_18, { as: "relationship_18s", foreignKey: "nif"});
  tickets.belongsTo(clientes, { as: "nif_cliente", foreignKey: "nif"});
  clientes.hasMany(tickets, { as: "tickets", foreignKey: "nif"});
  clientes.belongsTo(empresas, { as: "emp_nif_empresa", foreignKey: "emp_nif"});
  empresas.hasMany(clientes, { as: "clientes", foreignKey: "emp_nif"});
  softwaresadquiridos.belongsTo(empresas, { as: "nif_empresa", foreignKey: "nif"});
  empresas.hasMany(softwaresadquiridos, { as: "softwaresadquiridos", foreignKey: "nif"});
  planos.belongsTo(pedidos, { as: "idvenda_pedido", foreignKey: "idvenda"});
  pedidos.hasMany(planos, { as: "planos", foreignKey: "idvenda"});
  tipossoftwares.belongsTo(planos, { as: "idplano_plano", foreignKey: "idplano"});
  planos.hasMany(tipossoftwares, { as: "tipossoftwares", foreignKey: "idplano"});
  licencasatribuidas.belongsTo(softwaresadquiridos, { as: "chaveproduto_softwaresadquirido", foreignKey: "chaveproduto"});
  softwaresadquiridos.hasMany(licencasatribuidas, { as: "licencasatribuidas", foreignKey: "chaveproduto"});
  avaliacoes.belongsTo(tipossoftwares, { as: "idproduto_tipossoftware", foreignKey: "idproduto"});
  tipossoftwares.hasMany(avaliacoes, { as: "avaliacos", foreignKey: "idproduto"});
  orcamentos.belongsTo(tipossoftwares, { as: "idproduto_tipossoftware", foreignKey: "idproduto"});
  tipossoftwares.hasMany(orcamentos, { as: "orcamentos", foreignKey: "idproduto"});
  relationship_18.belongsTo(tipouser, { as: "iduser_tipouser", foreignKey: "iduser"});
  tipouser.hasMany(relationship_18, { as: "relationship_18s", foreignKey: "iduser"});
  clientes.belongsTo(ware, { as: "username_ware", foreignKey: "username"});
  ware.hasMany(clientes, { as: "clientes", foreignKey: "username"});
  tipossoftwares.belongsTo(ware, { as: "username_ware", foreignKey: "username"});
  ware.hasMany(tipossoftwares, { as: "tipossoftwares", foreignKey: "username"});

  return {
    avaliacoes,
    clientes,
    empresas,
    licencasatribuidas,
    orcamentos,
    pedidos,
    planos,
    relationship_18,
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
