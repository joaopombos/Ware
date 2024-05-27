// controllers/ClientesController.js
const Clientes = require('../models/Clientes');
const Empresas = require('../models/Empresas');
const TipoUser = require('../models/TipoUser');

const clientesController = {};

// List all clients
clientesController.list = async (req, res) => {
  try {
    const clients = await Clientes.findAll({ include: [Empresas, TipoUser] });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching clients' });
  }
};

// Add a new client
clientesController.create = async (req, res) => {
  try {
    const { EMP_NIF, IDUSER, NOME, EMAIL, CODIGOPESSOAL, CONTACTO, NIF } = req.body;
    const client = await Clientes.create({ EMP_NIF, IDUSER, NOME, EMAIL, CODIGOPESSOAL, CONTACTO, NIF });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error creating client' });
  }
};

// Update a client
clientesController.update = async (req, res) => {
  try {
    const { NIF } = req.params;
    const { EMP_NIF, IDUSER, NOME, EMAIL, CODIGOPESSOAL, CONTACTO } = req.body;
    const client = await Clientes.findByPk(NIF);
    if (client) {
      await client.update({ EMP_NIF, IDUSER, NOME, EMAIL, CODIGOPESSOAL, CONTACTO });
      res.json(client);
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating client' });
  }
};

// Delete a client
clientesController.delete = async (req, res) => {
  try {
    const { NIF } = req.params;
    const client = await Clientes.findByPk(NIF);
    if (client) {
      await client.destroy();
      res.json({ message: 'Client deleted' });
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting client' });
  }
};

module.exports = clientesController;
