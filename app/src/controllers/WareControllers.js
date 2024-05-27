/* Controllers a fazer

User Controllers

  Authentication and Authorization

    register: To handle user registration.
    login: To handle user login.
    logout: To handle user logout.
    getUser: To fetch the authenticated user’s details.
    updateUser: To update user information.
    deleteUser: To delete a user account.

  Permission Management

    grantPermission: To grant permissions to a manager.
    revokePermission: To revoke permissions from a manager.
    listPermissions: To list permissions granted by a user.

App Controllers

  App Management for Buyers/Managers

    createApp: To add a new app for sale.
    updateApp: To update app details.
    deleteApp: To delete an app.
    listApps: To list all apps created by the user.

  App Management for Managers with Permissions

    manageApp: To manage an app (only if the manager has permission).

Purchase Controllers

  App Purchase

    purchaseApp: To handle app purchase.
    listPurchases: To list all purchases made by a user.
    refundPurchase: To handle app refund requests.

Review and Rating Controllers

  App Reviews and Ratings

    addReview: To add a review for an app.
    updateReview: To update a review.
    deleteReview: To delete a review.
    listReviews: To list reviews for an 




controllers a baixo são da ficha 7 */

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
  
  