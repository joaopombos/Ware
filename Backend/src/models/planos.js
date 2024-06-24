const Sequelize = require("sequelize");
const sequelize = require("../models/database");
const Pedidos = require("./pedidos");

const Planos = sequelize.define("planos", {
  idvenda: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'pedidos',
      key: 'idvenda'
    }
  },
  designcaolicencas: {
    type: Sequelize.STRING(60),
    allowNull: true
  },
  desconto: {
    type: Sequelize.REAL,
    allowNull: true
  },
  precoplano: {
    type: Sequelize.REAL,
    allowNull: true
  },
  idplanos: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: "planos",
  schema: "public",
  timestamps: false,
  indexes: [
    {
      name: "pk_planos",
      unique: true,
      fields: [{ name: "idplanos" }]
    },
    {
      name: "planos_pk",
      unique: true,
      fields: [{ name: "idplanos" }]
    },
    {
      name: "relationship_15_fk",
      fields: [{ name: "idvenda" }]
    },
  ]
});

Planos.belongsTo(Pedidos, { foreignKey: "idvenda" });

module.exports = Planos;
