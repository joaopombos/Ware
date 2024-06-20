const Clientes = require('../models/clientes');
const Empresas = require('../models/empresas');
const TipoUser = require('../models/tipouser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const pool = require('../models/database');

const clientesController = {};

// Função para gerar senha aleatória
function generatePassword() {
  return crypto.randomBytes(6).toString('hex'); // Gera uma senha aleatória de 8 caracteres
}

// Listar todos os clientes
clientesController.list = async (req, res) => {
  try {
    const clients = await Clientes.findAll({ include: [Empresas, TipoUser] });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

// Adicionar um novo cliente
clientesController.createC_gestor = async (req, res) => {
  try {
    const { emp_nif, iduser, nome, email, contacto, nif } = req.body;

    // Verificar campos obrigatórios
    if (!emp_nif || !iduser || !nif) {
      return res.status(400).json({
        error: 'Faltam campos obrigatórios',
        details: [
          !emp_nif && 'emp_nif não pode ser nulo',
          !iduser && 'iduser não pode ser nulo',
          !nif && 'nif não pode ser nulo'
        ].filter(Boolean).join(', ')
      });
    }

    const codigopessoal = generatePassword();

    // Criar o cliente
    const client = await Clientes.create({ emp_nif, iduser, nome, email, codigopessoal, contacto, nif });

    // Configurar o transportador de e-mail
    let transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: '76a8dd002@smtp-brevo.com',
        pass: 'aIUpR5yJwXVBqLGN'
      },
      from: 'rodrigo.pina113@gmail.com'
    });

    // Configurar as opções do e-mail
    let mailOptions = {
      from: '"Ware" <rodrigo.pina113@gmail.com>',
      to: email,
      subject: 'Seu Código Pessoal',
      text: `Olá ${nome},\n\nO teu código pessoal é: ${codigopessoal}\n\nObrigado!`,
      html: `<p>Olá ${nome},</p><p>Seu código pessoal é: <strong>${codigopessoal}</strong></p><p>Obrigado!</p>`
    };

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Erro ao enviar e-mail', details: error.message });
      }
      res.status(201).json(client);
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente', details: error.message });
  }
};

// Atualizar um cliente
clientesController.update = async (req, res) => {
  try {
    const { NIF } = req.params;
    const { EMP_NIF, IDUSER, NOME, EMAIL, CODIGOPESSOAL, CONTACTO } = req.body;
    const client = await Clientes.findByPk(NIF);
    if (client) {
      await client.update({ EMP_NIF, IDUSER, NOME, EMAIL, CODIGOPESSOAL, CONTACTO });
      res.json(client);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
};

// Deletar um cliente
clientesController.delete = async (req, res) => {
  try {
    const { NIF } = req.params;
    const client = await Clientes.findByPk(NIF);
    if (client) {
      await client.destroy();
      res.json({ message: 'Cliente deletado' });
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
};

// Função de login

clientesController.login = async (req, res) => {
  const { email, codigopessoal } = req.body;

  try {
    // Busca o cliente pelo email e código pessoal
    const client = await Clientes.findOne({
      where: { email, codigopessoal }
    });

    // Se o cliente não existir
    if (!client) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Criação do token JWT
    const token = jwt.sign(
      { id: client.nif, email: client.email, role: client.iduser },
      'seuSegredoAqui', // Chave secreta para assinatura do token
      { expiresIn: '1h' } // Tempo de expiração do token (opcional)
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

// Função de logout
clientesController.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Erro ao encerrar a sessão.');
    }
    res.status(200).send('Logout realizado com sucesso.');
  });
};

module.exports = clientesController;




/* Sugestão Middleware e Frontend '/login'

// middlewares/auth.js
const jwt = require('jsonwebtoken');
const Clientes = require('../models/clientes');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const cliente = await Clientes.findOne({ where: { nif: decoded.nif } });
        if (!cliente) {
            throw new Error();
        }
        req.user = cliente;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

module.exports = { authenticate };




FRONTEND



import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [codigopessoal, setCodigopessoal] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, codigopessoal });
            localStorage.setItem('token', response.data.token);
            history.push('/library'); // Redirecionar para a página da biblioteca após login
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Código Pessoal:</label>
                    <input
                        type="password"
                        value={codigopessoal}
                        onChange={(e) => setCodigopessoal(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;


*/


