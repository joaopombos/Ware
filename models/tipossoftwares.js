const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipossoftwares', {
    categoria: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    idproduto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    imagenssoftware: {
      type: DataTypes.BLOB,
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
          { name: "idplanos" },
        ]
      },
      {
        name: "relationship_7_fk",
        fields: [
          { name: "idware" },
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
