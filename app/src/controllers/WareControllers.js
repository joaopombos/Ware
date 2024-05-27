const sequelize = require('../../models/database');
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





const Filmes = require("../model/filme");
const Genero = require("../model/genero");
const sequelize = require("../model/database");
const fs = require("fs");

const controllers = {};

sequelize.sync({ force: false })
  .then(() => {
    console.log("A Database e tabelas foram criadas com sucesso!");
    seedGenres();
  });

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
        message: "Filme registrado com sucesso",
        data: novoFilme
      });
    } catch (error) {
      console.error("Erro ao registrar filme:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
  
  controllers.app_update = async (req, res) => {
    const id = req.params.id;
    try {
      const filme = await Filmes.findByPk(id);
      if (!filme) {
        return res.status(404).json({ message: "Filme não encontrado" });
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
  
  