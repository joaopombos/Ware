const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  const Addons = sequelize.define('addons', {
    idaddon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    categoria: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    idplanos: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'planos',
        key: 'idplanos'
      }
    },
    idware: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ware',
        key: 'idware'
      }
    },
    idproduto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipossoftwares',
        key: 'idproduto'
      }
    },
    idorcamento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orcamentos',
        key: 'idorc'
      }
    },
    logotipo: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    versao: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    descricao: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    imagensaddon: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    preco: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'addons',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "addons_pk",
        unique: true,
        fields: [
          { name: "idaddon" },
        ]
      },
      {
        name: "pk_addons",
        unique: true,
        fields: [
          { name: "idaddon" },
        ]
      },
      {
        name: "relationship_addon_avaliacoes",
        fields: [
          { name: "idaddon" },
        ]
      },
      {
        name: "relationship_addon_orcamentos",
        fields: [
          { name: "idorcamento" },
        ]
      },
      {
        name: "relationship_addon_planos",
        fields: [
          { name: "idplanos" },
        ]
      },
      {
        name: "relationship_addon_tipossoftwares",
        fields: [
          { name: "idproduto" },
        ]
      },
      {
        name: "relationship_addon_ware",
        fields: [
          { name: "idware" },
        ]
      },
    ]
  });

  return Addons;
};

