const TipoSoftwares = require('../models/tipossoftwares');
const Orcamentos = require('../models/orcamentos');
const Clientes = require('../models/clientes');
const SoftwaresAdquiridos = require('../models/softwaresadquiridos');
const Avaliacoes = require('../models/avaliacoes');
const Addons = require('../models/addons');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

const adminController = {};

adminController.listSoftwares = async (req, res) => {
    const { query } = req.query;

    let whereCondition = {};
    if (query) {
        whereCondition = {
            nome: {
                [Op.iLike]: `%${query}%`
            }
        };
    }

    try {
        const softwares = await TipoSoftwares.findAll({ where: whereCondition });
        res.json(softwares);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching softwares' });
    }
};

adminController.getSoftwareById = async (req, res) => {
    const { idproduto } = req.params;

    try {
        const software = await TipoSoftwares.findByPk(idproduto);
        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }
        res.json(software);
    } catch (error) {
        console.error('Erro ao buscar software:', error);
        res.status(500).json({ error: 'Error fetching software' });
    }
};


adminController.updateSoftware = async (req, res) => {
    const { idproduto } = req.params;
    const { nome, descricao, categoria, versao, precoproduto, logotipo, imagenssoftware } = req.body;

    try {
        const software = await TipoSoftwares.findByPk(idproduto);
        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }

        const updateData = { nome, descricao, categoria, versao, precoproduto };

        if (logotipo) {
            updateData.logotipo = logotipo; // Assuming logotipo is a base64 encoded string or a URL
        }

        if (imagenssoftware) {
            updateData.imagenssoftware = imagenssoftware; // Assuming imagenssoftware is an array of base64 encoded strings or URLs
        }

        await software.update(updateData);

        res.json(software);
    } catch (error) {
        console.error('Error updating software:', error);
        res.status(500).json({ error: 'Error updating software' });
    }
};


adminController.deleteSoftware = async (req, res) => {
    const { idproduto } = req.params;

    try {
        const software = await TipoSoftwares.findByPk(idproduto);
        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }

        await software.destroy();
        res.json({ message: 'Software deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting software' });
    }
};



adminController.addSoftware = async (req, res) => {
    try {
        const { nome, descricao, categoria, versao, precoproduto, idproduto, logotipo, imagenssoftware } = req.body;
    
        console.log('Dados recebidos para adicionar software:', req.body);

        if (!idproduto) {
          return res.status(400).json({ error: 'ID do produto não fornecido.' });
        }

        const novoSoftware = await TipoSoftwares.create({
          nome,
          descricao,
          categoria,
          versao,
          precoproduto,
          idproduto,
          logotipo,
          imagenssoftware
        });
    
        console.log('Software adicionado:', novoSoftware);

        res.status(201).json(novoSoftware);
      } catch (error) {
        console.error('Erro ao adicionar software:', error);
        res.status(500).json({ error: 'Erro ao adicionar software.' });
      }
  };



adminController.listBudgets = async (req, res) => {
    try {
        const budgets = await Orcamentos.findAll();
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching budgets' });
    }
  };



adminController.getBudgetDetails = async (req, res) => {
  const { idorca } = req.params;

  try {
      const budget = await Orcamentos.findByPk(idorca);
      if (!budget) {
          return res.status(404).json({ error: 'Budget not found' });
      }
      res.json(budget);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching budget details' });
  }
};

adminController.respondToBudget = async (req, res) => {
    const { idorca } = req.params;
    const { resposta } = req.body;

    try {
        const budget = await Orcamentos.findByPk(idorca);
        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        const cliente = await Clientes.findOne({ where: { nif: budget.nif } });
        if (!cliente) {
            return res.status(404).json({ error: 'Client not found' });
        }

        let transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            auth: {
                user: '76a8dd002@smtp-brevo.com',
                pass: 'aIUpR5yJwXVBqLGN'
            }
        });

        let mailOptions = {
            from: '"Ware" <rodrigo.pina113@gmail.com>',
            to: cliente.email,
            subject: `Resposta ao Orçamento`,
            text: resposta
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Error sending email', details: error.message });
            }
            res.json({ message: 'Response sent successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error responding to budget', details: error.message });
    }
};




adminController.listAcquiredSoftwares = async (req, res) => {
    try {
        const nif = req.cookies.nif;
        if (!nif) {
            return res.status(400).json({ error: 'NIF do usuário não fornecido nos cookies' });
        }
        
        const cliente = await Clientes.findOne({ where: { nif } });

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        
        const softwares = await SoftwaresAdquiridos.findAll({ where: { nif: cliente.emp_nif } });

        if (!softwares || softwares.length === 0) {
            return res.status(404).json({ error: 'Nenhum software adquirido encontrado para este cliente' });
        }

        res.json(softwares);
    } catch (error) {
        console.error('Erro ao buscar softwares adquiridos:', error);
        res.status(500).json({ error: 'Erro ao buscar softwares adquiridos' });
    }
};



adminController.listAddons = async (req, res) => {
    const { idproduto } = req.params;

    try {
        const addons = await Addons.findAll({ where: { idproduto } });
        res.json(addons);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching addons' });
    }
};




adminController.compareAndUpdateSoftware = async (req, res) => {
    const { chaveproduto } = req.params;

    try {
        const softwareAdquirido = await SoftwaresAdquiridos.findOne({ where: { chaveproduto } });
        if (!softwareAdquirido) {
            return res.status(404).json({ error: 'Acquired software not found' });
        }

        const tipoSoftware = await TipoSoftwares.findOne({ where: { idproduto: softwareAdquirido.idproduto } });
        if (!tipoSoftware) {
            return res.status(404).json({ error: 'Software type not found' });
        }

        if (softwareAdquirido.versaoadquirida !== tipoSoftware.versao) {
            await softwareAdquirido.update({
                nome: tipoSoftware.nome,
                versaoadquirida: tipoSoftware.versao
            });
            return res.json({ message: 'Software updated successfully', softwareAdquirido });
        }

        res.json({ message: 'Software is up to date', softwareAdquirido });
    } catch (error) {
        res.status(500).json({ error: 'Error comparing and updating software' });
    }
};



module.exports = adminController;