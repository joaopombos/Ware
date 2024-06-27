const { v4: uuidv4 } = require('uuid');
const sequelize = require('../models/database'); // Import the sequelize instance
const { fn, col } = require('sequelize'); // Import Sequelize functions
const Pedidos = require('../models/pedidos');
const LicencasAtribuidas = require('../models/licencasatribuidas');
const SoftwaresAdquiridos = require('../models/softwaresadquiridos');
const TipoSoftwares = require('../models/tipossoftwares');
const Addons = require('../models/addons');
const Clientes = require('../models/clientes');
const { Op } = require('sequelize');


const shopController = {};

shopController.listForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchase.findAll({ where: { userId }, include: [App] });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching purchases' });
  }
};

shopController.listCategoriesOrSoftwares = async (req, res) => {
    try {
        const softwares = await TipoSoftwares.findAll({
            attributes: [
                'idproduto',
                'logotipo',
                'nome',
                'descricao',
                'precoproduto',
                'versao'
            ],
            order: [['nome', 'ASC']]
        });
        res.json(softwares);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching all softwares' });
    }
};

shopController.listCategoriesOrAddons = async (req, res) => {
    try {
        const addons = await Addons.findAll({
            attributes: [
                'idaddon',
                'logotipo',
                'nome',
                'descricao',
                'preco'
            ],
            order: [['nome', 'ASC']]
        });
        res.json(addons);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching all addons' });
    }
};





shopController.softwareDetails = async (req, res) => {
    const { idproduto } = req.params; // Captura o 'idproduto' dos parâmetros da rota

    try {
        const software = await TipoSoftwares.findByPk(idproduto);

        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }

        res.json(software);
    } catch (error) {
        console.error('Error retrieving software details:', error);
        res.status(500).json({ error: 'Error retrieving software details' });
    }
};


shopController.addonDetails = async (req, res) => {
    const { idaddon } = req.params; // Assuming the identifier for addons is idaddon
  
    try {
      const addon = await Addons.findByPk(idaddon);
  
      if (!addon) {
        return res.status(404).json({ error: 'Addon not found' });
      }
  
      res.json(addon);
    } catch (error) {
      console.error('Error retrieving addon details:', error);
      res.status(500).json({ error: 'Error retrieving addon details' });
    }
  };


shopController.confirmOrder = async (req, res) => {
    const { idvenda } = req.params;
  
    try {
        const pedido = await Pedidos.findByPk(idvenda, {
            include: [{
                model: TipoSoftwares,
                as: 'softwares',
                required: true
            }]
        });
  
        if (!pedido) {
            return res.status(404).json({ error: 'Order not found' });
        }
  
        const softwares = await TipoSoftwares.findAll({
            where: { idproduto: pedido.idproduto },
            order: ['nome']
        });
  
        res.json({
            pedido,
            softwares,
            total: pedido.precofinal
        });
    } catch (error) {
        res.status(500).json({ error: 'Error confirming order' });
    }
  };
  


shopController.realizarCompra = async (req, res) => {
    const { quantidade, produtoId } = req.body;
    const { nif } = req.user;

    try {
        const software = await TipoSoftwares.findByPk(produtoId);
        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }

        const novoPedido = await Pedidos.create({
            idproduto: produtoId,
            idcliente: nif,
            quantidade,
            precofinal: software.precoproduto * quantidade,
            status: 'pendente'
        });


        await Licencas.bulkCreate(Array.from({ length: quantidade }).map(() => ({
            idpedido: novoPedido.id,
            idsoftware: produtoId,
            status: 'ativa'
        })));

        res.status(201).json({ message: 'Compra realizada com sucesso', pedido: novoPedido });
    } catch (error) {
        console.error('Error completing purchase:', error);
        res.status(500).json({ error: 'Error completing purchase' });
    }
};



shopController.purchaseSuccess = async (req, res) => {
    try {
        const { produtoId, nome, versao, quantidade, emp_nif } = req.body;

        const software = await TipoSoftwares.findByPk(produtoId);
        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }

        if (!emp_nif) {
            return res.status(400).json({ error: 'NIF da empresa não fornecido no pedido' });
        }

        const chaveProduto = uuidv4().replace(/-/g, '').slice(0, 12);

        const novoSoftware = await SoftwaresAdquiridos.create({
            nome, 
            chaveproduto: chaveProduto,
            nif: emp_nif, 
            versaoadquirida: versao 
        });

        const maxIdResult = await LicencasAtribuidas.findOne({
            attributes: [[sequelize.fn('max', sequelize.col('idatribuida')), 'maxId']]
        });
        const maxId = maxIdResult ? maxIdResult.get('maxId') || 0 : 0;

        let idCounter = maxId + 1;

        const licencasCriadas = await Promise.all(
            Array.from({ length: quantidade }).map(() => LicencasAtribuidas.create({
                chaveproduto: chaveProduto,
                nomepc: `PC do Cliente`,
                dataatri: new Date(),
                idatribuida: idCounter++
            }))
        );

        res.json({
            message: 'Compra realizada com sucesso',
            chaveProduto: chaveProduto,
            softwareInfo: novoSoftware,
            createdLicenses: licencasCriadas
        });
    } catch (error) {
        console.error('Erro ao processar compra:', error.message, error.stack);
        res.status(500).json({ error: 'Erro ao processar compra' });
    }
};


  







module.exports = shopController;