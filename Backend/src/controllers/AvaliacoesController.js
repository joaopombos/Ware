// controllers/AvaliacoesController.js
const Avaliacoes = require('../models/Avaliacoes');
const TiposSoftwares = require('../models/TiposSoftwares');

const avaliacoesController = {};

// List all reviews for a product
avaliacoesController.list = async (req, res) => {
  try {
    const reviews = await Avaliacoes.findAll({ where: { IDPRODUTO: req.params.productId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
};

// Add a new review
avaliacoesController.create = async (req, res) => {
  try {
    const { IDPRODUTO, COMENTARIO, CLASSIFICACAO, DATAAVALIACAO } = req.body;
    const review = await Avaliacoes.create({ IDPRODUTO, COMENTARIO, CLASSIFICACAO, DATAAVALIACAO });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Error creating review' });
  }
};

// Update a review
avaliacoesController.update = async (req, res) => {
  try {
    const { IDAVALIACAO } = req.params;
    const { COMENTARIO, CLASSIFICACAO, DATAAVALIACAO } = req.body;
    const review = await Avaliacoes.findByPk(IDAVALIACAO);
    if (review) {
      await review.update({ COMENTARIO, CLASSIFICACAO, DATAAVALIACAO });
      res.json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating review' });
  }
};

// Delete a review
avaliacoesController.delete = async (req, res) => {
  try {
    const { IDAVALIACAO } = req.params;
    const review = await Avaliacoes.findByPk(IDAVALIACAO);
    if (review) {
      await review.destroy();
      res.json({ message: 'Review deleted' });
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting review' });
  }
};

module.exports = avaliacoesController;
