const TipoSoftwares = require('../models/tipossoftwares');
const Orcamentos = require('../models/orcamentos');
const Clientes = require('../models/clientes');
const SoftwaresAdquiridos = require('../models/softwaresadquiridos');
const LicencasAtribuidas = require('../models/licencasatribuidas');
const tiposoftadd = require('../models/tiposoftadd');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

const adminController = {};


adminController.listSoftwares = async (req, res) => {
    const { tipo, query } = req.query;

    let whereCondition = {};
    if (query) {
        whereCondition = {
            nome: {
                [Op.iLike]: `%${query}%`
            }
        };
    }

    try {
        let softwares;
        if (tipo === 'softwares') {
            softwares = await TipoSoftwares.findAll({ where: { ...whereCondition, idtipo: 1 } });
        } else {
            softwares = await TipoSoftwares.findAll({ where: { ...whereCondition, idtipo: 2 } }); // Busca softwares (idtipo = 1)
        }

        // Converte a imagem BLOB em base64
        const softwaresComBase64 = softwares.map(software => {
            const jsonSoftware = software.toJSON();
            return {
                ...jsonSoftware,
                logotipo: jsonSoftware.logotipo ? jsonSoftware.logotipo.toString('base64') : null, // Converte logotipo
                imagenssoftware: jsonSoftware.imagenssoftware ? jsonSoftware.imagenssoftware.toString('base64') : null // Converte imagenssoftware
            };
        });

        console.log('Softwares com Base64:', softwaresComBase64); // Debugging line

        res.json(softwaresComBase64);
    } catch (error) {
        console.error(error);
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
    const { nome, descricao, categoria, versao, precoproduto, logotipo, imagenssoftware, idtipo } = req.body;

    try {
        const software = await TipoSoftwares.findByPk(idproduto);
        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }

        // Função para converter base64 para Buffer
        const base64ToBuffer = (base64String) => {
            if (!base64String) return null;
            return Buffer.from(base64String.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        };

        const updateData = {
            nome,
            descricao,
            categoria,
            versao,
            precoproduto,
            idproduto,
            logotipo: base64ToBuffer(logotipo),
            imagenssoftware: base64ToBuffer(imagenssoftware),
            idtipo
        };



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
        const { nome, descricao, categoria, versao, precoproduto, idproduto, logotipo, imagenssoftware, idtipo } = req.body;

        console.log('Dados recebidos para adicionar software:', req.body);

        if (!idproduto) {
            return res.status(400).json({ error: 'ID do produto não fornecido.' });
        }

        // Função para converter base64 para Buffer
        const base64ToBuffer = (base64String) => {
            if (!base64String) return null;
            return Buffer.from(base64String.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        };

        const novoSoftware = await TipoSoftwares.create({
            nome,
            descricao,
            categoria,
            versao,
            precoproduto,
            idproduto,
            logotipo: base64ToBuffer(logotipo),
            imagenssoftware: base64ToBuffer(imagenssoftware),
            idtipo
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

        const softwaresWithLicenses = await Promise.all(softwares.map(async (software) => {
            const licenses = await LicencasAtribuidas.findAll({ where: { chaveproduto: software.chaveproduto } });
            return {
                ...software.dataValues,
                licenses
            };
        }));

        res.json(softwaresWithLicenses);
    } catch (error) {
        console.error('Erro ao buscar softwares adquiridos:', error);
        res.status(500).json({ error: 'Erro ao buscar softwares adquiridos' });
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

