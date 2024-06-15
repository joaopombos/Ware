const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('avaliacoes', {
    idproduto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipossoftwares',
        key: 'idproduto'
      }
    },
    idavaliacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    comentario: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    classificacao: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dataavaliacao: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'avaliacoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "avaliacoes_pk",
        unique: true,
        fields: [
          { name: "idavaliacao" },
        ]
      },
      {
        name: "pk_avaliacoes",
        unique: true,
        fields: [
          { name: "idavaliacao" },
        ]
      },
      {
        name: "relationship_3_fk",
        fields: [
          { name: "idproduto" },
        ]
      },
    ]
  });
};
