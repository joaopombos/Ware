const { Sequelize, fn, col } = require('sequelize');
const Orcamentos = require('../models/orcamentos');

const adminController = {};

// Função para calcular métricas dos orçamentos
adminController.getMetrics = async (req, res) => {
    try {
        // Soma dos custos dos orçamentos
        const totalCost = await Orcamentos.sum('precoorcamento');

        // Média dos custos dos orçamentos
        const averageCost = await Orcamentos.findAll({
            attributes: [[fn('AVG', col('precoorcamento')), 'averageCost']],
        });

        // Contagem total de orçamentos
        const totalBudgets = await Orcamentos.count();

        res.json({
            totalCost,
            averageCost: averageCost.length > 0 ? averageCost[0].dataValues.averageCost : null,
            totalBudgets
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching metrics' });
    }
};

module.exports = adminController;
