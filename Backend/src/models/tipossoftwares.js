const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TipoSoftwares = sequelize.define('tipossoftwares', {
    categoria: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    idproduto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idplanos: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'planos',
        key: 'idplanos'
      }
    },
    logotipo: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    versao: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    descricao: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    imagenssoftware: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    precoproduto: {
      type: DataTypes.REAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tipossoftwares',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipossoftwares",
        unique: true,
        fields: [
          { name: "idproduto" },
        ]
      },
      {
        name: "relationship_14_fk",
        fields: [
          { name: "idplanos" },
        ]
      },
      {
        name: "tipossoftwares_pk",
        unique: true,
        fields: [
          { name: "idproduto" },
        ]
      },
    ]
  });

  return TipoSoftwares;
};

