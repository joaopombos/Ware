const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SoftwaresAdquiridos = sequelize.define('SoftwaresAdquiridos', {
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
    versaoadquirida: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
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

  return SoftwaresAdquiridos;
};


