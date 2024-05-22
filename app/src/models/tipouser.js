const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipouser', {
    designacao: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'tipouser',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipouser",
        unique: true,
        fields: [
          { name: "iduser" },
        ]
      },
      {
        name: "tipouser_pk",
        unique: true,
        fields: [
          { name: "iduser" },
        ]
      },
    ]
  });
};
