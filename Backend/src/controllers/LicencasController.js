// controllers/LicencasAtribuidasController.js
const LicencasAtribuidas = require('../models/LicencasAtribuidas');

const licencasAtribuidasController = {};

// List all assigned licenses
licencasAtribuidasController.list = async (req, res) => {
  try {
    const licenses = await LicencasAtribuidas.findAll();
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching licenses' });
  }
};

// Add a new assigned license
licencasAtribuidasController.create = async (req, res) => {
  try {
    const { CHAVEPRODUTO, NOMEPC, DATAATRI } = req.body;
    const license = await LicencasAtribuidas.create({ CHAVEPRODUTO, NOMEPC, DATAATRI });
    res.status(201).json(license);
  } catch (error) {
    res.status(500).json({ error: 'Error creating license' });
  }
};

// Update an assigned license
licencasAtribuidasController.update = async (req, res) => {
  try {
    const { IDATRIBUIDA } = req.params;
    const { CHAVEPRODUTO, NOMEPC, DATAATRI } = req.body;
    const license = await LicencasAtribuidas.findByPk(IDATRIBUIDA);
    if (license) {
      await license.update({ CHAVEPRODUTO, NOMEPC, DATAATRI });
      res.json(license);
    } else {
      res.status(404).json({ error: 'License not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating license' });
  }
};

// Delete an assigned license
licencasAtribuidasController.delete = async (req, res) => {
  try {
    const { IDATRIBUIDA } = req.params;
    const license = await LicencasAtribuidas.findByPk(IDATRIBUIDA);
    if (license) {
      await license.destroy();
      res.json({ message: 'License deleted' });
    } else {
      res.status(404).json({ error: 'License not found' });
    }
  } catch (error) {
    res.status(500),json({ error: 'Error deleting license' });
  }
};

module.exports = licencasAtribuidasController;
