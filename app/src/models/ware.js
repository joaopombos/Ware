const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ware', {
    username: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    lucros: {
      type: DataTypes.REAL,
      allowNull: true
    },
    gastos: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ware',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_ware",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "ware_pk",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
