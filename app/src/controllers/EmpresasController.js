// controllers/EmpresasController.js
const Empresas = require('../models/Empresas');

const empresasController = {};

// List all companies
empresasController.list = async (req, res) => {
  try {
    const companies = await Empresas.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching companies' });
  }
};

// Add a new company
empresasController.create = async (req, res) => {
  try {
    const { NOMEEMPRESA, NIF, LOCALIZACAO, CODIGOCONVITE, CONTACTO } = req.body;
    const company = await Empresas.create({ NOMEEMPRESA, NIF, LOCALIZACAO, CODIGOCONVITE, CONTACTO });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Error creating company' });
  }
};

// Update a company
empresasController.update = async (req, res) => {
  try {
    const { NIF } = req.params;
    const { NOMEEMPRESA, LOCALIZACAO, CODIGOCONVITE, CONTACTO } = req.body;
    const company = await Empresas.findByPk(NIF);
    if (company) {
      await company.update({ NOMEEMPRESA, LOCALIZACAO, CODIGOCONVITE, CONTACTO });
      res.json(company);
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating company' });
  }
};

// Delete a company
empresasController.delete = async (req, res) => {
  try {
    const { NIF } = req.params;
    const company = await Empresas.findByPk(NIF);
    if (company) {
      await company.destroy();
      res.json({ message: 'Company deleted' });
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting company' });
  }
};

module.exports = empresasController;
