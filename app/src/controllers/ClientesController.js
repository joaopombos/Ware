// controllers/ClientesController.js
const Clientes = require('../models/clientes');
const Empresas = require('../models/empresas');
const TipoUser = require('../models/tipouser');

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
    const { emp_nif, iduser, nome, email, codigopessoal, contacto, nif, idware } = req.body;
    if (!emp_nif || !iduser || !nome || !email || !codigopessoal || !contacto || !nif) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const client = await Clientes.create({ emp_nif, iduser, nome, email, codigopessoal, contacto, nif, idware });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error creating client', details: error.message });
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
