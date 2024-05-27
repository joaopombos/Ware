const Analytics = require('../models/Analytics');
const App = require('../models/App');

const analyticsController = {};

// Pega analytics de uma app especifica
analyticsController.getAppStats = async (req, res) => {
  try {
    const { appId } = req.params;
    const analytics = await Analytics.findOne({ where: { appId } });
    if (!analytics) {
      return res.status(404).json({ error: 'Analytics not found for this app' });
    }
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching analytics' });
  }
};

// Pega analytics de todas as apps
analyticsController.getAllStats = async (req, res) => {
  try {
    const analytics = await Analytics.findAll();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all analytics' });
  }
};

// Update analytics de uma app especifica
analyticsController.updateAppStats = async (req, res) => {
  try {
    const { appId } = req.params;
    const { downloads, purchases, rating } = req.body;
    const analytics = await Analytics.findOne({ where: { appId } });
    if (!analytics) {
      return res.status(404).json({ error: 'Analytics not found for this app' });
    }
    await analytics.update({ downloads, purchases, rating });
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Error updating analytics' });
  }
};

module.exports = analyticsController;
