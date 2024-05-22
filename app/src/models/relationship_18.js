const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relationship_18', {
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tipouser',
        key: 'iduser'
      }
    },
    nif: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'clientes',
        key: 'nif'
      }
    }
  }, {
    sequelize,
    tableName: 'relationship_18',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_relationship_18",
        unique: true,
        fields: [
          { name: "iduser" },
          { name: "nif" },
        ]
      },
      {
        name: "relationship_18_fk",
        fields: [
          { name: "iduser" },
        ]
      },
      {
        name: "relationship_18_pk",
        unique: true,
        fields: [
          { name: "iduser" },
          { name: "nif" },
        ]
      },
      {
        name: "relationship_19_fk",
        fields: [
          { name: "nif" },
        ]
      },
    ]
  });
};
