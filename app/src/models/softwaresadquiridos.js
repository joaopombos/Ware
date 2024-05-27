const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwaresadquiridos', {
    nome: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    chaveproduto: {
      type: DataTypes.STRING(29),
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
