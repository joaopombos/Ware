const TipoSoftwares = require('../models/tipossoftwares');
const shopController = {};
// Listar softwares, opcionalmente por categoria
shopController.listSoftwaresByCategory = async (req, res) => {
    const { categoria } = req.query;
    try {
        const whereCondition = categoria ? { categoria } : {};
        const softwares = await TipoSoftwares.findAll({ where: whereCondition });
        res.json(softwares);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching softwares' });
    }
};
module.exports = shopController;