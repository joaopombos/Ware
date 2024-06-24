const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Clientes', {
    emp_nif: {
      type: DataTypes.STRING(9),
      allowNull: false,
      references: {
        model: 'empresas',
        key: 'nif'
      }
    },
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipouser',
        key: 'iduser'
      }
    },
    nome: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    codigopessoal: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    contacto: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    nif: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
  }, {
    tableName: 'clientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clientes_pk",
        unique: true,
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "pk_clientes",
        unique: true,
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "relationship_16_fk",
        fields: [
          { name: "emp_nif" },
        ]
      },
      {
        name: "relationship_18_fk",
        fields: [
          { name: "iduser" },
        ]
      },
    ]
  });
};

