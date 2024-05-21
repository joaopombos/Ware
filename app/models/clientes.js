const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clientes', {
    emp_nif: {
      type: DataTypes.STRING(9),
      allowNull: false,
      references: {
        model: 'empresas',
        key: 'nif'
      }
    },
    nome: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    codigopessoal: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    contacto: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    localizacao: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    nif: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'ware',
        key: 'username'
      }
    }
  }, {
    sequelize,
    tableName: 'clientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clientes_pk",
        unique: true,
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "pk_clientes",
        unique: true,
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "relationship_16_fk",
        fields: [
          { name: "emp_nif" },
        ]
      },
      {
        name: "relationship_9_fk",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
