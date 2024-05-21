const sequelize = require('../../models/database');
const Avaliacoes = require('../models/Avaliacoes');
const Clientes = require('../models/clientes');
const Empresas = require('../models/empresas');
const LicencasAtri = require('../models/licencasatribuidas');
const Orcamentos = require('../models/orcamentos');
const Pedidos = require('../models/pedidos');
const Planos = require('../models/planos');
const softwareadq = require('../models/softwaresadquiridos');
const tickets = require('../models/tickets');
const tiposoftware = require('../models/tipossoftwares');
const tipouser = require('../models/tipouser');
const ware = require('../models/ware');

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