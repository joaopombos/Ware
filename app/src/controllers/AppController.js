// controllers/AppController.js
const App = require('../models/App');
const User = require('../models/User');

const appController = {};

// List all apps
appController.list = async (req, res) => {
  try {
    const apps = await App.findAll();
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching apps' });
  }
};

// Get details of a specific app
appController.getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await App.findByPk(id);
    if (!app) {
      return res.status(404).json({ error: 'App not found' });
    }
    res.json(app);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching app details' });
  }
};

// Create a new app
appController.create = async (req, res) => {
  try {
    const { name, description, price, userId } = req.body;
    const app = await App.create({ name, description, price, userId });
    res.status(201).json(app);
  } catch (error) {
    res.status(500).json({ error: 'Error creating app' });
  }
};

// Update an app
appController.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const app = await App.findByPk(id);
    if (!app) {
      return res.status(404).json({ error: 'App not found' });
    }
    await app.update({ name, description, price });
    res.json(app);
  } catch (error) {
    res.status(500).json({ error: 'Error updating app' });
  }
};

// Delete an app
appController.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await App.findByPk(id);
    if (!app) {
      return res.status(404).json({ error: 'App not found' });
    }
    await app.destroy();
    res.json({ message: 'App deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting app' });
  }
};

module.exports = appController;
