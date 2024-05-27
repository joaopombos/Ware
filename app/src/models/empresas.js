const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('empresas', {
    nomeempresa: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    nif: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    localizacao: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    codigoconvite: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'empresas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "empresas_pk",
        unique: true,
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "pk_empresas",
        unique: true,
        fields: [
          { name: "nif" },
        ]
      },
    ]
  });
};
