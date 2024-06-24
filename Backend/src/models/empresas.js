const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Empresas = sequelize.define('Empresas', {
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
      type: DataTypes.STRING(24),
      allowNull: true
    },
    codigoconvite: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    contacto: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
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

  return Empresas;
};

