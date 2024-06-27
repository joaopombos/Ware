const Pedidos = require('../models/pedidos');
const LicencasAtribuidas = require('../models/licencasatribuidas');
const SoftwaresAdquiridos = require('../models/softwaresadquiridos');
const TipoSoftwares = require('../models/tipossoftwares');
const Avaliacoes = require('../models/avaliacoes')
const Addons = require('../models/addons');
const Clientes = require('../models/clientes');
const { Op } = require('sequelize');


const shopController = {};

// List all purchases for a user
shopController.listForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await Purchase.findAll({ where: { userId }, include: [App] });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching purchases' });
  }
};

// Função unificada para listar categorias ou softwares baseado na presnça do parâmetro 'categoria'
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
            order: [['nome', 'ASC']] // Ordena por nome do software em ordem alfabética
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
/*  Sugestão para '/shop/:idproduto/'

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SoftwareDetails = () => {
    const { idproduto } = useParams();
    const [software, setSoftware] = useState(null);

    useEffect(() => {
        const fetchSoftwareDetails = async () => {
            try {
                const response = await axios.get(`/shop/${idproduto}/`);
                setSoftware(response.data);
            } catch (error) {
                console.error('Error fetching software details:', error);
            }
        };

        fetchSoftwareDetails();
    }, [idproduto]);

    if (!software) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{software.nome}</h1>
            <p>{software.descricao}</p>
            <p>Versão: {software.versao}</p>
            <p>Preço: {software.precoproduto}</p>
            <Link to={`/shop/${idproduto}/confirm`}>
                <button>Comprar</button>
            </Link>
        </div>
    );
};

export default SoftwareDetails;

*/





// Função para buscar detalhes de um pedido específico pelo ID
// shopController.confirmOrder
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
  

/*  Sugestão Front end para '/shop/:idvenda/confirm'

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const ConfirmOrder = () => {
    const { idvenda } = useParams();
    const history = useHistory();
    const [orderDetails, setOrderDetails] = useState(null);
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/shop/${idvenda}/confirm`);
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [idvenda]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handleConfirmPurchase = async () => {
        try {
            // Implementar a lógica para processar o pagamento e confirmar a compra
            // Redirecionar para a página de sucesso após a compra
            history.push(`/shop/${idvenda}/success`);
        } catch (error) {
            console.error('Error confirming purchase:', error);
        }
    };

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Confirmação de Compra</h1>
            <h2>Softwares no Carrinho:</h2>
            <ul>
                {orderDetails.softwares.map(software => (
                    <li key={software.idproduto}>
                        {software.nome} - Quantidade: {orderDetails.pedido.quantidade} - Preço: {software.precoproduto}
                    </li>
                ))}
            </ul>
            <h3>Total: {orderDetails.total}</h3>

            <h2>Detalhes do Cartão de Crédito:</h2>
            <form>
                <div>
                    <label>Número do Cartão:</label>
                    <input type="text" name="number" value={cardDetails.number} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Data de Validade:</label>
                    <input type="text" name="expiry" value={cardDetails.expiry} onChange={handleInputChange} />
                </div>
                <div>
                    <label>CVC:</label>
                    <input type="text" name="cvc" value={cardDetails.cvc} onChange={handleInputChange} />
                </div>
                <button type="button" onClick={handleConfirmPurchase}>Confirmar Compra</button>
            </form>
        </div>
    );
};


export default ConfirmOrder;
*/


shopController.realizarCompra = async (req, res) => {
    const { quantidade, produtoId } = req.body;
    const { nif } = req.user; // Obtendo o ID do usuário autenticado

    try {
        // Verificar se o software está disponível para compra
        const software = await TipoSoftwares.findByPk(produtoId);
        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }

        // Criar um novo pedido
        const novoPedido = await Pedidos.create({
            idproduto: produtoId,
            idcliente: nif, // Associar o pedido ao usuário logado
            quantidade,
            precofinal: software.precoproduto * quantidade,
            status: 'pendente' // Pode ser 'pendente', 'processando', etc.
        });

        // Criar as licenças correspondentes ao pedido
        await Licencas.bulkCreate(Array.from({ length: quantidade }).map(() => ({
            idpedido: novoPedido.id,
            idsoftware: produtoId,
            status: 'ativa' // Pode ser 'ativa', 'inativa', etc.
            // Outros campos relevantes das licenças
        })));

        // Responder com os detalhes do pedido
        res.status(201).json({ message: 'Compra realizada com sucesso', pedido: novoPedido });
    } catch (error) {
        console.error('Error completing purchase:', error);
        res.status(500).json({ error: 'Error completing purchase' });
    }
};



// Função para confirmar a compra e atribuir uma chave de licença
// shopController.purchaseSuccess
shopController.purchaseSuccess = async (req, res) => {
    try {
        // Busca detalhes do software específico no pedido
        const software = await TipoSoftwares.findByPk(req.body.produtoId);
        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }

        // Busca o NIF do usuário nos cookies (ou ajuste conforme sua lógica de sessão)
        const nif = req.cookies.nif;
        if (!nif) {
            return res.status(400).json({ error: 'NIF do usuário não fornecido nos cookies' });
        }
        
        // Busca o cliente pelo NIF
        const cliente = await Clientes.findOne({ where: { nif } });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        // Gera uma nova chave de licença
        const chaveProduto = uuidv4(); // Usando UUID para gerar uma chave única

        // Cria uma nova entrada no SoftwaresAdquiridos
        const novoSoftware = await SoftwaresAdquiridos.create({
            nome: software.nome, // Nome do software adquirido
            chaveproduto: chaveProduto,
            nif: cliente.nif, // NIF do cliente
            versaoadquirida: software.versao // Versão do software adquirido
        });

        // Adiciona o número de licenças atribuídas em LicencasAtribuidas
        const quantidadeLicencas = req.body.quantidade;
        const licencasCriadas = [];

        for (let i = 0; i < quantidadeLicencas; i++) {
            const novaLicenca = await LicencasAtribuidas.create({
                chaveproduto: chaveProduto,
                nomepc: `PC do Cliente ${i + 1}`, // Ajuste conforme necessário
                dataatri: new Date(),
                idatribuida: uuidv4() // Usando UUID para gerar um ID único para a licença
            });

            licencasCriadas.push(novaLicenca);
        }

        res.json({
            message: 'Compra realizada com sucesso',
            chaveProduto: chaveProduto,
            softwareInfo: novoSoftware,
            createdLicenses: licencasCriadas
        });
    } catch (error) {
        console.error('Erro ao processar compra:', error);
        res.status(500).json({ error: 'Erro ao processar compra' });
    }
};


  







module.exports = shopController;