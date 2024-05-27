const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orcamentos', {
    nif: {
      type: DataTypes.STRING(9),
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'nif'
      }
    },
    idorcamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idproduto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipossoftwares',
        key: 'idproduto'
      }
    },
    estado: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    resposta: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    precoorcamento: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orcamentos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "orcamentos_pk",
        unique: true,
        fields: [
          { name: "idorcamento" },
        ]
      },
      {
        name: "pk_orcamentos",
        unique: true,
        fields: [
          { name: "idorcamento" },
        ]
      },
      {
        name: "relationship_11_fk",
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "relationship_12_fk",
        fields: [
          { name: "idproduto" },
        ]
      },
    ]
  });
};
