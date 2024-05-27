const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ware', {
    username: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    lucros: {
      type: DataTypes.REAL,
      allowNull: true
    },
    gastos: {
      type: DataTypes.REAL,
      allowNull: true
    },
    idware: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
          { name: "idware" },
        ]
      },
      {
        name: "ware_pk",
        unique: true,
        fields: [
          { name: "idware" },
        ]
      },
    ]
  });
};
