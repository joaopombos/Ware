const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./database');

const Addons = sequelize.define('ADDONS', {
  IDADDON: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CATEGORIA: {
    type: DataTypes.STRING(30)
  },
  IDPLANOS: {
    type: DataTypes.INTEGER,
    references: {
      model: 'PLANOS', // Nome da tabela referenciada
      key: 'IDPLANOS'
    }
  },
  IDWARE: {
    type: DataTypes.INTEGER,
    references: {
      model: 'WARE', // Nome da tabela referenciada
      key: 'IDWARE'
    }
  },
  IDPRODUTO: {
    type: DataTypes.INTEGER,
    references: {
      model: 'TIPOSSOFTWARES', // Nome da tabela referenciada
      key: 'IDPRODUTO'
    }
  },
  IDORCAMENTO: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ORCAMENTOS', // Nome da tabela referenciada
      key: 'IDORC'
    }
  },
  LOGOTIPO: {
    type: DataTypes.BLOB
  },
  NOME: {
    type: DataTypes.STRING(30)
  },
  VERSAO: {
    type: DataTypes.STRING(10)
  },
  DESCRICAO: {
    type: DataTypes.STRING(250)
  },
  IMAGENSADDON: {
    type: DataTypes.BLOB
  },
  PRECO: {
    type: DataTypes.REAL
  }
}, {
  sequelize,
  tableName: 'ADDONS',
  timestamps: false,
  indexes: [
    {
      name: "ADDONS_PK",
      unique: true,
      fields: [
        { name: "IDADDON" }
      ]
    },
    {
      name: "RELATIONSHIP_ADDON_PLANOS",
      fields: [
        { name: "IDPLANOS" }
      ]
    },
    {
      name: "RELATIONSHIP_ADDON_WARE",
      fields: [
        { name: "IDWARE" }
      ]
    },
    {
      name: "RELATIONSHIP_ADDON_TIPOSSOFTWARES",
      fields: [
        { name: "IDPRODUTO" }
      ]
    },
    {
      name: "RELATIONSHIP_ADDON_ORCAMENTOS",
      fields: [
        { name: "IDORCAMENTO" }
      ]
    },
    {
      name: "RELATIONSHIP_ADDON_AVALIACOES",
      fields: [
        { name: "IDADDON" }
      ]
    }
  ]
});

module.exports = Addons;
