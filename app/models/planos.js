const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('planos', {
    idvenda: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pedidos',
        key: 'idvenda'
      }
    },
    designcaolicencas: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    desconto: {
      type: DataTypes.REAL,
      allowNull: true
    },
    precoplano: {
      type: DataTypes.REAL,
      allowNull: true
    },
    idplano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'planos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_planos",
        unique: true,
        fields: [
          { name: "idplano" },
        ]
      },
      {
        name: "planos_pk",
        unique: true,
        fields: [
          { name: "idplano" },
        ]
      },
      {
        name: "relationship_15_fk",
        fields: [
          { name: "idvenda" },
        ]
      },
    ]
  });
};
