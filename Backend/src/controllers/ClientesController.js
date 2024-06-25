const Clientes = require('../models/clientes'); // Verifique se o caminho do modelo está correto
const  Empresas  = require('../models/empresas');
const TipoUser = require('../models/tipouser');
const Ware = require('../models/ware')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const pool = require('../models/database');
const bcrypt = require('bcrypt');


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
clientesController.createSignup = async (req, res) => {
  try {
    const { nomeempresa, emp_nif, localizacao, contacto_empresa, nome, email, contacto_cliente, nif } = req.body;

    // Verificar campos obrigatórios
    if (!nomeempresa || !emp_nif || !nome || !email || !nif) {
      return res.status(400).json({
        error: 'Faltam campos obrigatórios',
        details: [
          !nomeempresa && 'nomeempresa não pode ser nulo',
          !emp_nif && 'emp_nif não pode ser nulo',
          !nome && 'nome não pode ser nulo',
          !email && 'email não pode ser nulo',
          !nif && 'nif não pode ser nulo'
        ].filter(Boolean).join(', ')
      });
    }

    // Verificar se a empresa já existe
    let empresa = await Empresas.findOne({ where: { nif: emp_nif } });

    if (!empresa) {
      // Criar a empresa se não existir
      empresa = await Empresas.create({ nomeempresa, nif: emp_nif, localizacao,  contacto: contacto_empresa });
    }

    // Gerar código pessoal
    const codigopessoal = generatePassword();

    // Definir iduser como 2 (outra lógica pode ser aplicada conforme necessário)
    const iduser = 1;

    // Criar o cliente usando o modelo Clientes
    const client = await Clientes.create({ emp_nif, iduser, nome, email, codigopessoal, contacto: contacto_cliente, nif });

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
      subject: 'Código Pessoal',
      text: `Olá ${nome},\n\nO código pessoal é: ${codigopessoal}\n\nObrigado!`,
      html: `<p>Olá ${nome},</p><p>O código pessoal é: <strong>${codigopessoal}</strong></p><p>Obrigado!</p>`
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

const jwtSecret = 'seuSegredoAqui';

clientesController.login = async (req, res) => {
  const { email, codigopessoal } = req.body;

  try {
    // Validação de entrada
    if (!email || !codigopessoal) {
      return res.status(400).json({ error: 'Email e código pessoal são obrigatórios.' });
    }

    // Encontrar o cliente pelo email
    const client = await Clientes.findOne({ where: { email } });

    // Se o cliente não for encontrado
    if (!client) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Comparar o codigopessoal diretamente
    if (codigopessoal !== client.codigopessoal) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Criar token JWT
    const token = jwt.sign(
      { id: client.nif, email: client.email, iduser: client.iduser },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Armazenar o token JWT e o NIF em cookies seguros
    res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 }); // 1 hora
    res.cookie('nif', client.nif, { httpOnly: true, secure: false, maxAge: 3600000 }); // 1 hora
    res.cookie('iduser', client.iduser, { httpOnly: true, secure: false, maxAge: 3600000 }); // 1 hora

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

// Função de logout
clientesController.logout = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('nif');
  res.clearCookie('iduser');
  res.status(200).send('Logout realizado com sucesso.');
};

clientesController.logoutadmin = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('idware');
  res.status(200).send('Logout realizado com sucesso.');
};




clientesController.create_gestor = async (req, res) => {
  try {
    const { emp_nif, nome, email, contacto: contacto_cliente, nif  } = req.body;

    // Verificar campos obrigatórios
    if (!emp_nif || !nome || !email || !nif) {
      return res.status(400).json({
        error: 'Faltam campos obrigatórios',
        details: [
          !emp_nif && 'emp_nif não pode ser nulo',
          !nome && 'nome não pode ser nulo',
          !email && 'email não pode ser nulo',
          !nif && 'nif não pode ser nulo'
        ].filter(Boolean).join(', ')
      });
    }

    // Verificar se emp_nif existe
    const empresaExistente = await Empresas.findOne({ where: { nif: emp_nif } });
    if (!empresaExistente) {
      return res.status(400).json({
        error: 'emp_nif não é válido',
        details: 'emp_nif fornecido não corresponde a nenhuma empresa existente'
      });
    }

    const codigopessoal = generatePassword();

    const iduser = 2;

    // Criar o cliente
    const client = await Clientes.create({ emp_nif, iduser, nome, email, codigopessoal, contacto: contacto_cliente, nif });

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
      subject: 'Código Pessoal',
      text: `Olá ${nome},\n\nO teu código pessoal é: ${codigopessoal}\n\nObrigado!`,
      html: `<p>Olá ${nome},</p><p>O seu código pessoal é: <strong>${codigopessoal}</strong></p><p>Obrigado!</p>`
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

clientesController.loginadmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validação de entrada
    if (!username || !password) {
      return res.status(400).json({ error: 'Username e password são obrigatórios.' });
    }

    // Encontrar o usuário Ware pelo username
    const wareUser = await Ware.findOne({ where: { username } });

    // Se o usuário não for encontrado
    if (!wareUser) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }


    if (password !== wareUser.password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Criar token JWT
    const token = jwt.sign(
      { idware: wareUser.idware, username: wareUser.username },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Armazenar o token JWT e o ID do Ware em cookies seguros
    res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 }); // 1 hora
    res.cookie('idware', wareUser.idware, { httpOnly: true, secure: false, maxAge: 3600000 }); // 1 hora

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
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


