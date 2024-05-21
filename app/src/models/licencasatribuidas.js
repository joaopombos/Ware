const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('licencasatribuidas', {
    chaveproduto: {
      type: DataTypes.STRING(29),
      allowNull: true,
      references: {
        model: 'softwaresadquiridos',
        key: 'chaveproduto'
      }
    },
    nomepc: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    dataatri: {
      type: DataTypes.DATE,
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'licencasatribuidas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "licencasatribuidas_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "pk_licencasatribuidas",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "relationship_13_fk",
        fields: [
          { name: "chaveproduto" },
        ]
      },
    ]
  });
};
