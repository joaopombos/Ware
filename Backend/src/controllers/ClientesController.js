// controllers/ClientesController.js
const Clientes = require('../models/clientes');
const Empresas = require('../models/empresas');
const TipoUser = require('../models/tipouser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


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

function generatePassword() {
  return crypto.randomBytes(6).toString('hex'); // Gera uma senha aleatória de 8 caracteres
}
// Add a new client
clientesController.createC_gestor = async (req, res) => {
  try {
    const { emp_nif, iduser, nome, email, contacto, nif} = req.body;

    // Verificar campos obrigatórios
    if (!emp_nif || !iduser || !nif) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: [
          !emp_nif && 'emp_nif cannot be null',
          !iduser && 'iduser cannot be null',
          !nif && 'nif cannot be null'
        ].filter(Boolean).join(', ')
      });
    }

    const codigopessoal = generatePassword();

    // Criar o cliente
    const client = await Clientes.create({ emp_nif, iduser, nome, email, codigopessoal, contacto, nif});


    // Configurar o transportador de e-mail
    let transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com', // Servidor SMTP do Elastic Email
      port: 587, // Porta SMTP padrão para Elastic Email
      auth: {
        user: '76a8dd002@smtp-brevo.com', // Substitua pelo seu usuário Elastic Email
        pass: 'aIUpR5yJwXVBqLGN' // Substitua pela sua chave API Elastic Email
      },

      from: 'rodrigo.pina113@gmail.com'
    });

    // Configurar as opções do e-mail
    let mailOptions = {
      from: '"Ware" <rodrigo.pina113@gmail.com>', // Substitua pelo remetente
      to: email, // Destinatário
      subject: 'Seu Código Pessoal',
      text: `Olá ${nome},\n\nO teu código pessoal é: ${codigopessoal}\n\nObrigado!`,
      html: `<p>Olá ${nome},</p><p>Seu código pessoal é: <strong>${codigopessoal}</strong></p><p>Obrigado!</p>`
    };

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sending email', details: error.message });
      }
      res.status(201).json(client);
    });

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
