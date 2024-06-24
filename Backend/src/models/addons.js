const Sequelize = require("sequelize");
const sequelize = require("./database");
const Planos = require("./planos");
const TiposSoftwares = require("./tipossoftwares");
const Ware = require("./ware");
const Orcamentos = require("./orcamentos");

const Addons = sequelize.define("addons", {
  idaddon: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  categoria: {
    type: Sequelize.STRING(30),
    allowNull: true,
  },
  idplanos: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Planos,
      key: "idplanos",
    },
  },
  idware: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Ware,
      key: "idware",
    },
  },
  idproduto: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: TiposSoftwares,
      key: "idproduto",
    },
  },
  idorcamento: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Orcamentos,
      key: "idorc",
    },
  },
  logotipo: {
    type: Sequelize.BLOB,
    allowNull: true,
  },
  nome: {
    type: Sequelize.STRING(30),
    allowNull: true,
  },
  versao: {
    type: Sequelize.STRING(10),
    allowNull: true,
  },
  descricao: {
    type: Sequelize.STRING(250),
    allowNull: true,
  },
  imagensaddon: {
    type: Sequelize.BLOB,
    allowNull: true,
  },
  preco: {
    type: Sequelize.REAL,
    allowNull: true,
  },
}, {
  tableName: "addons",
  schema: "public",
  timestamps: false,
  indexes: [
    {
      name: "addons_pk",
      unique: true,
      fields: [{ name: "idaddon" }],
    },
    {
      name: "pk_addons",
      unique: true,
      fields: [{ name: "idaddon" }],
    },
  ],
});

Addons.belongsTo(Planos, { foreignKey: "idplanos" });
Addons.belongsTo(TiposSoftwares, { foreignKey: "idproduto" });
Addons.belongsTo(Ware, { foreignKey: "idware" });
Addons.belongsTo(Orcamentos, { foreignKey: "idorcamento" });

module.exports = Addons;
