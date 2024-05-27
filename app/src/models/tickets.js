const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tickets', {
    nif: {
      type: DataTypes.STRING(9),
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'nif'
      }
    },
    idticket: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    assunto: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    dataabert: {
      type: DataTypes.DATE,
      allowNull: true
    },
    datafecho: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(30),
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
          { name: "idticket" },
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
          { name: "idticket" },
        ]
      },
    ]
  });
};
