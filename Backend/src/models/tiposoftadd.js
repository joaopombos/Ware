const Sequelize = require("sequelize");
const sequelize = require("./database");
const Pedidos = require("./pedidos");

const Tiposoftadd = sequelize.define("TipoSoftAdd", {
 designcaosoftadd: {
    type: Sequelize.STRING(60),
    allowNull: true
  },
  idtipo: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: "TipoSoftAdd",
  schema: "public",
  timestamps: false,
  indexes: [
    {
      name: "pk_planos",
      unique: true,
      fields: [{ name: "idtipo" }]
    },
    {
      name: "planos_pk",
      unique: true,
      fields: [{ name: "idtipo" }]
    },
  ]
});

Tiposoftadd.belongsTo(Pedidos, { foreignKey: "idvenda" });

module.exports = Tiposoftadd;
