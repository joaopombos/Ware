const Filmes = require('../models/Filmes');
const Genero = require('../models/generos');
const sequelize = require('../models/database');

const controllers = {};

controllers.filme_list = async (req, res) => {
    try {
        const data = await Filmes.findAll({ include: Genero });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}
module.exports = controllers;