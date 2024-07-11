const { v4: uuidv4 } = require('uuid');
const sequelize = require('../models/database'); // Import the sequelize instance
const { fn, col } = require('sequelize'); // Import Sequelize functions
const Pedidos = require('../models/pedidos');
const LicencasAtribuidas = require('../models/licencasatribuidas');
const SoftwaresAdquiridos = require('../models/softwaresadquiridos');
const TipoSoftwares = require('../models/tipossoftwares');
const Versoes = require('../models/versoes');
const tiposoftadd = require('../models/tiposoftadd');
const Clientes = require('../models/clientes');
const Empresas = require('../models/empresas');
const { Op } = require('sequelize');


const shopController = {};


shopController.listCategoriesOrSoftwares = async (req, res) => {
    const { type, query } = req.query; // 'type' is used instead of 'tipo' for consistency in the shop context

    let whereCondition = {};
    if (query) {
        whereCondition.nome = { [Op.iLike]: `%${query}%` }; // Filter by name if a query is provided
    }

    try {
        let items;
        if (type === 'softwares') {
            items = await TipoSoftwares.findAll({
                where: { ...whereCondition, idtipo: 1 } // idtipo = 1 for softwares
            });
        } else {
            items = await TipoSoftwares.findAll({
                where: { ...whereCondition, idtipo: 2 } // idtipo = 2 for addons
            });
        }

        // Convert BLOB images to base64
        const itemsWithBase64 = items.map(item => {
            const jsonItem = item.toJSON();
            return {
                ...jsonItem,
                logotipo: jsonItem.logotipo ? Buffer.from(jsonItem.logotipo).toString('base64') : null,
                imagenssoftware: jsonItem.imagenssoftware ? Buffer.from(jsonItem.imagenssoftware).toString('base64') : null
            };
        });

        console.log('Items with Base64:', itemsWithBase64); // Debugging line

        res.json(itemsWithBase64);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Error fetching items' });
    }
};

const stripe = require('stripe')('sk_test_51JbCVGJuN2xREvwFmnv3dGbp3DupvLh7JtPUcZNFAB8a1qKTeDcUk25PRIDn5UHin5n3OFhQkScUWawEUJVViJwi00JzYtVuUJ'); // Sua chave secreta do Stripe




async function gerarChaveUnica() {
    let chaveUnica = null;
    let chaveExiste = true;

    while (chaveExiste) {
        chaveUnica = uuidv4().replace(/-/g, '').slice(0, 12);
        const chaveEncontrada = await SoftwaresAdquiridos.findOne({ where: { chaveproduto: chaveUnica } });
        if (!chaveEncontrada) {
            chaveExiste = false;
        }
    }

    return chaveUnica;
}

async function gerarChaveUnica() {
    let chaveUnica = null;
    let chaveExiste = true;

    while (chaveExiste) {
        chaveUnica = uuidv4().replace(/-/g, '').slice(0, 12);
        const chaveEncontrada = await SoftwaresAdquiridos.findOne({ where: { chaveproduto: chaveUnica } });
        if (!chaveEncontrada) {
            chaveExiste = false;
        }
    }

    return chaveUnica;
}

shopController.purchaseSuccess = async (req, res) => {
    try {
        const { idproduto, nome, versao, quantidade, emp_nif } = req.body;

        const software = await TipoSoftwares.findByPk(idproduto);
        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }

        if (!emp_nif) {
            return res.status(400).json({ error: 'NIF da empresa não fornecido no pedido' });
        }

        const empresa = await Empresas.findOne({ where: { nif: emp_nif } });
        if (!empresa) {
            return res.status(404).json({ error: 'Empresa não encontrada' });
        }

        // Criar a sessão de checkout com o Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: software.nome,
                        },
                        unit_amount: software.precoproduto * 100,
                    },
                    quantity: quantidade,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3001/shop/sucess',
            cancel_url: 'http://localhost:3001/shop/cancel',
        });

        // Check if the software is already purchased
        const existingPurchase = await SoftwaresAdquiridos.findOne({
            where: {
                nome: nome,
                versaoadquirida: versao,
                nif: emp_nif
            }
        });

        let chaveProduto;
        if (existingPurchase) {
            chaveProduto = existingPurchase.chaveproduto;
        } else {
            chaveProduto = await gerarChaveUnica();
            await SoftwaresAdquiridos.create({
                nome,
                chaveproduto: chaveProduto,
                nif: emp_nif,
                versaoadquirida: versao
            });
        }

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
            createdLicenses: licencasCriadas,
            sessionId: session.id // Incluindo o sessionId na resposta
        });
    } catch (error) {
        console.error('Erro ao processar compra:', error.message, error.stack);
        res.status(500).json({ error: 'Erro ao processar compra' });
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




shopController.getVersionsByProductId = async (req, res) => {
    const { idproduto } = req.params;

    try {
        const versions = await Versoes.findAll({ where: { idproduto } });
        res.json(versions);
    } catch (error) {
        console.error('Error fetching versions:', error);
        res.status(500).json({ error: 'Error fetching versions' });
    }
};




module.exports = shopController;