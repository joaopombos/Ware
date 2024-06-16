const ware = require('../models/ware');
const User = require('../models/User');
const App = require('../models/App');
const userController = {};
const appController = {};

// register: To handle user registration.
userController.register = async (req, res) => {
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
userController.login = async (req, res) => {
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
userController.logout = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logout bem-sucedido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer logout' });
  }
};

// getUser: To fetch the authenticated user’s details.
userController.getUser = async (req, res) => {
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
userController.updateUser = async (req, res) => {
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
userController.deleteUser = async (req, res) => {
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
// List all apps created by the user
appController.listApps = async (req, res) => {
  try {
    const { userId } = req.params;
    const apps = await App.findAll({ where: { userId } });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching apps' });
  }
};

// Get details of a specific app
appController.getAppDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await App.findOne({ where: { id } });
    if (!app) {
      return res.status(404).json({ error: 'App not found' });
    }
    res.json(app);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching app details' });
  }
};

// Create a new app for sale
appController.createApp = async (req, res) => {
  try {
    const { name, description, price, userId } = req.body;
    const app = await App.create({ name, description, price, userId });
    res.status(201).json(app);
  } catch (error) {
    res.status(500).json({ error: 'Error creating app' });
  }
};

// Update app details
appController.updateApp = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const [updated] = await App.update({ name, description, price }, { where: { id } });
    if (updated === 0) {
      return res.status(404).json({ error: 'App not found' });
    }
    const updatedApp = await App.findOne({ where: { id } });
    res.json(updatedApp);
  } catch (error) {
    res.status(500).json({ error: 'Error updating app' });
  }
};

// Delete an app
appController.deleteApp = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await App.destroy({ where: { id } });
    if (deleted === 0) {
      return res.status(404).json({ error: 'App not found' });
    }
    res.json({ message: 'App deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting app' });
  }
};

module.exports = userController;
module.exports = appController;

    


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

const controllers = {};


controllers.app_list = async (req, res) => {
    try {
      const data = await Filmes.findAll({ include: Genero });
  
      const filmesComBase64 = data.map((filme) => {
        return {
          ...filme.toJSON(),
          foto: filme.foto ? filme.foto.toString("base64") : null,
        };
      });
  
      res.json(filmesComBase64);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro de servidor" });
    }
  };
  
  controllers.app_detail = async (req, res) => {
    try {
      const filme = await Filmes.findByPk(req.params.id, { include: Genero });
      if (!filme) {
        return res.status(404).json({ message: "App não encontradas" });
      }
      res.json(filme);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  controllers.app_create = async (req, res) => {
    try {
      const { titulo, descricao, foto, GeneroId } = req.body;
      const novoFilme = await Filmes.create({
        titulo,
        descricao,
        foto,
        GeneroId
      });
      res.status(201).json({
        success: true,
        message: "App registrada com sucesso",
        data: novoFilme
      });
    } catch (error) {
      console.error("Erro ao registrar app:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
  
  controllers.app_update = async (req, res) => {
    const id = req.params.id;
    try {
      const filme = await Filmes.findByPk(id);
      if (!filme) {
        return res.status(404).json({ message: "App não encontrada" });
      }
  
      const { titulo, descricao, GeneroId, foto } = req.body;
  
      await filme.update({
        titulo: titulo,
        descricao: descricao,
        GeneroId: parseInt(GeneroId, 10),
        foto: foto,
      });
  
      res.json(filme);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  controllers.app_delete = async (req, res) => {
    const { id } = req.params; 
  
    if (!id) {
      return res.status(400).json({ message: "ID é necessário para eliminar" });
    }
  
    try {
      const del = await Filmes.destroy({
        where: { id: id }
      });
  
      if (del > 0) {
        return res.json({ success: true, message: "Eliminado com Sucesso" });
      } else {
        return res.status(404).json({ message: "Filme não encontrado" });
      }
    } catch (error) {
      console.error("Erro a eliminar o Filme:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  module.exports = controllers;
  
  