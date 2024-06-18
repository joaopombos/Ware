const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models/database'); // Certifique-se de ajustar o caminho conforme necessário

const Orcamentos = sequelize.define('orcamentos', {
    nif: {
        type: DataTypes.STRING(9),
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'nif'
        }
    },
    idproduto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tipossoftwares',
            key: 'idproduto'
        }
    },
    idorc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    estado: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    precoorcamento: {
        type: DataTypes.REAL,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'orcamentos',
    schema: 'public',
    timestamps: false,
    indexes: [
        {
            name: "orcamentos_pk",
            unique: true,
            fields: [
                { name: "idorc" },
            ]
        },
        {
            name: "pk_orcamentos",
            unique: true,
            fields: [
                { name: "idorc" },
            ]
        },
        {
            name: "relationship_11_fk",
            fields: [
                { name: "nif" },
            ]
        },
        {
            name: "relationship_12_fk",
            fields: [
                { name: "idproduto" },
            ]
        },
    ]
});

module.exports = Orcamentos;
