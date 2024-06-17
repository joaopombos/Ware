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

shopController.softwareDetails = async (req, res) => {
  const { idproduto } = req.params; // Captura o 'idproduto' dos parâmetros da rota

  try {
      const software = await TipoSoftwares.findByPk(idproduto);
      if (!software) {
          return res.status(404).json({ error: 'Software not found' });
      }
      res.json(software);
  } catch (error) {
      res.status(500).json({ error: 'Error retrieving software details' });
  }
};

module.exports = shopController;
