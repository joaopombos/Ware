const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tickets', {
    resposta: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nif: {
      type: DataTypes.STRING(9),
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'nif'
      }
    },
    dataabertura: {
      type: DataTypes.DATE,
      allowNull: true
    },
    datafecho: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tickets',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tickets",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "relationship_10_fk",
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "tickets_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
