const { DataTypes } = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const TipoUser = sequelize.define('tipouser', {
    designacao: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'tipouser',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'pk_tipouser',
        unique: true,
        fields: ['iduser']
      }
    ]
  });

  return TipoUser;
};


