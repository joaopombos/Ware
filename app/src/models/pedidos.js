const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pedidos', {
    nif: {
      type: DataTypes.STRING(9),
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'nif'
      }
    },
    idvenda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    datavenda: {
      type: DataTypes.DATE,
      allowNull: true
    },
    precofinal: {
      type: DataTypes.REAL,
      allowNull: true
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pedidos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pedidos_pk",
        unique: true,
        fields: [
          { name: "idvenda" },
        ]
      },
      {
        name: "pk_pedidos",
        unique: true,
        fields: [
          { name: "idvenda" },
        ]
      },
      {
        name: "relationship_6_fk",
        fields: [
          { name: "nif" },
        ]
      },
    ]
  });
};
