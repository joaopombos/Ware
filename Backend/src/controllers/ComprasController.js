// controllers/PurchaseController.js
const Purchase = require('../models/Purchase');
const User = require('../models/User');
const App = require('../models/App');

const purchaseController = {};

// List all purchases for a user
purchaseController.listForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchase.findAll({ where: { userId }, include: [App] });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching purchases' });
  }
};

// Get details of a specific purchase
purchaseController.getDetails = async (req, res) => {
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
purchaseController.create = async (req, res) => {
  try {
    const { userId, appId, price } = req.body;
    const purchase = await Purchase.create({ userId, appId, price });
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: 'Error creating purchase' });
  }
};

// Update a purchase
purchaseController.update = async (req, res) => {
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
purchaseController.delete = async (req, res) => {
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

module.exports = purchaseController;
