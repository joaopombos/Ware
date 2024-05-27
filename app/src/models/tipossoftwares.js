const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipossoftwares', {
    idplano: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'planos',
        key: 'idplano'
      }
    },
    categoria: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    idproduto: {
      type: DataTypes.INTEGER,
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
    },
    logotipo: {
      type: "BIT(254)",
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    versao: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    descricao: {
      type: DataTypes.STRING(560),
      allowNull: true
    },
    imagenssoftware: {
      type: "BIT(254)",
      allowNull: true
    },
    precoproduto: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tipossoftwares',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipossoftwares",
        unique: true,
        fields: [
          { name: "idproduto" },
        ]
      },
      {
        name: "relationship_14_fk",
        fields: [
          { name: "idplano" },
        ]
      },
      {
        name: "relationship_7_fk",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "tipossoftwares_pk",
        unique: true,
        fields: [
          { name: "idproduto" },
        ]
      },
    ]
  });
};
