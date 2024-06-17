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
            attributes: [[fn('AVG', col('precoorcamento')), 'averageCost']]
        });

        // Contagem de orçamentos por mês
        const budgetsByMonth = await Orcamentos.findAll({
            attributes: [
                [fn('DATE_TRUNC', 'month', col('createdAt')), 'month'],
                [fn('COUNT', col('idorc')), 'count']
            ],
            group: [fn('DATE_TRUNC', 'month', col('createdAt'))],
            order: [[fn('DATE_TRUNC', 'month', col('createdAt')), 'ASC']]
        });

        // Mês com mais orçamentos
        const mostBudgetsMonth = budgetsByMonth.reduce((max, item) => {
            return item.dataValues.count > max.count ? { month: item.dataValues.month, count: item.dataValues.count } : max;
        }, { month: null, count: 0 });

        res.json({
            totalCost,
            averageCost: averageCost[0].dataValues.averageCost,
            mostBudgetsMonth
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching metrics' });
    }
};

module.exports = adminController;
