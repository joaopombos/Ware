const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwaresadquiridos', {
    nome: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    chaveproduto: {
      type: DataTypes.STRING(12),
      allowNull: false,
      primaryKey: true
    },
    nif: {
      type: DataTypes.STRING(9),
      allowNull: true,
      references: {
        model: 'empresas',
        key: 'nif'
      }
    },
    versaoadquirida: { // Nova coluna adicionada
      type: DataTypes.STRING(30), // Tipo STRING com tamanho máximo de 30 caracteres
      allowNull: true // Permitindo valores nulos, ajuste conforme necessário
    }
  }, {
    sequelize,
    tableName: 'softwaresadquiridos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_softwaresadquiridos",
        unique: true,
        fields: [
          { name: "chaveproduto" },
        ]
      },
      {
        name: "relationship_17_fk",
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "softwaresadquiridos_pk",
        unique: true,
        fields: [
          { name: "chaveproduto" },
        ]
      },
    ]
  });
};
