const Sequelize = require('sequelize');
const sequelize = require('./database.js');

const Genero = sequelize.define('Genero', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: Sequelize.STRING
}, {
    timestamps: false,
    tableName: 'genres'
});

module.exports = Genero;
