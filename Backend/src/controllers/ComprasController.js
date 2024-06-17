const TipoSoftwares = require('../models/tipossoftwares');
const { Op } = require('sequelize');

const shopController = {};

// List all purchases for a user
shopController.listForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchase.findAll({ where: { userId }, include: [App] });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching purchases' });
  }
};

// Get details of a specific purchase
shopController.getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByPk(id, { include: [App, User] });
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }
    res.json(purchase);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching purchase details' });
  }
};

// Create a new purchase
shopController.create = async (req, res) => {
  try {
    const { userId, appId, price } = req.body;
    const purchase = await Purchase.create({ userId, appId, price });
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: 'Error creating purchase' });
  }
};

// Update a purchase
shopController.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, appId, price } = req.body;
    const purchase = await Purchase.findByPk(id);
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }
    await purchase.update({ userId, appId, price });
    res.json(purchase);
  } catch (error) {
    res.status(500).json({ error: 'Error updating purchase' });
  }
};

// Delete a purchase
shopController.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByPk(id);
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }
    await purchase.destroy();
    res.json({ message: 'Purchase deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting purchase' });
  }
};

// Função unificada para listar categorias ou softwares baseado na presnça do parâmetro 'categoria'
shopController.listCategoriesOrSoftwares = async (req, res) => {
    const { categoria } = req.query; // Captura 'categoria' da query string

    if (categoria) {
        // Se 'categoria' estiver presente na query, listar softwares dessa categoria
        try {
            const softwares = await TipoSoftwares.findAll({
                where: { categoria },
                order: ['nome'] // Ordena alfabeticamente pelo nome do software
            });
            res.json(softwares);
        } catch (error) {
            res.status(500).json({ error: `Error fetching softwares for category ${categoria}` });
        }
    } else {
        // Se 'categoria' não estiver presente, listar todas as categorias disponíveis
        try {
            const categories = await TipoSoftwares.findAll({
                attributes: ['categoria'],
                group: ['categoria'], // Agrupa pela coluna 'categoria' para evitar duplicatas
                where: {
                    categoria: {
                        [Op.ne]: null  // Filtra para evitar categorias nulas
                    }
                },
                order: ['categoria'] // Ordena alfabeticamente pelas categorias
            });
            res.json(categories.map(cat => cat.categoria));
        } catch (error) {
            res.status(500).json({ error: 'Error fetching categories' });
        }
    }
};

module.exports = shopController;


module.exports = purchaseController;
