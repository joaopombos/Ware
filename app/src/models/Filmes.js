var Sequelize = require('sequelize');
var sequelize = require('./database');
var Genero = require('./generos'); 

var Filmes = sequelize.define('filmes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    título: Sequelize.STRING, 
    descrição: Sequelize.STRING, 
    foto: Sequelize.BLOB,
    generoId: { 
        type: Sequelize.INTEGER,
        references: {
            model: Genero, 
            key: 'id' 
        }
    }
},
{
    timestamps: false,
});

Filmes.belongsTo(Genero, { foreignKey: 'generoId'}); 
module.exports = Filmes;