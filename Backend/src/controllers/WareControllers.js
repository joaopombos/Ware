
const sequelize = require('../models/database');
const Avaliacoes = require('../models/Avaliacoes');
const Clientes = require('../models/clientes');
const Empresas = require('../models/empresas');
const LicencasAtri = require('../models/licencasatribuidas');
const Orcamentos = require('../models/orcamentos');
const Pedidos = require('../models/pedidos');
const Planos = require('../models/planos');
const softwareadq = require('../models/softwaresadquiridos');
const tickets = require('../models/tickets');
const tiposoftware = require('../models/tipossoftwares');
const tipouser = require('../models/tipouser');
const ware = require('../models/ware');

const fs = require("fs");
const wareController = {};


// register: To handle user registration.
wareController.register = async (req, res) => {
  try {
    const { username, password, lucros, gastos } = req.body;

    const newUser = await ware.create({
      username,
      password,
      lucros,
      gastos
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

// login: To handle user login.
wareController.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await ware.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    if (password !== user.password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.status(200).json({ message: 'Login bem sucedido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

//   logout: To handle user logout.
wareController.logout = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logout bem-sucedido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer logout' });
  }
};

// getUser: To fetch the authenticated user’s details.
wareController.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

// updateUser: To update user information.
wareController.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, password, lucros, gastos } = req.body;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (username) user.username = username;
    if (password) user.password = password;
    if (lucros !== undefined) user.lucros = lucros;
    if (gastos !== undefined) user.gastos = gastos;

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

// deleteUser: To delete a user account.
wareController.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await user.destroy();

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
};
module.exports = wareController;



  