const Pedidos = require('../models/pedidos');
const LicencasAtribuidas = require('../models/licencasatribuidas');
const SoftwaresAdquiridos = require('../models/softwaresadquiridos');
const TipoSoftwares = require('../models/tipossoftwares');
const Avaliacoes = require('../models/avaliacoes')
const Addons = require('../models/addons');
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
                'precoproduto'
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
shopController.confirmOrder = async (req, res) => {
  const { idvenda } = req.params; // Captura o 'idvenda' dos parâmetros da rota

  try {
      const pedido = await Pedidos.findByPk(idvenda, {
          include: [{
              model: TipoSoftwares,
              as: 'softwares', // Ajuste conforme a associação definida
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



// Função para confirmar a compra e atribuir uma chave de licença
shopController.purchaseSuccess = async (req, res) => {
  const { idvenda } = req.params;

  try {
      // Busca o pedido pelo ID
      const pedido = await Pedidos.findByPk(idvenda);
      if (!pedido) {
          return res.status(404).json({ error: 'Order not found' });
      }

      // Busca detalhes do software específico no pedido
      const software = await TipoSoftwares.findByPk(pedido.idproduto);
      if (!software) {
          return res.status(404).json({ error: 'Software not found' });
      }

      // Gera uma nova chave de licença
      const chaveProduto = uuidv4(); // Usando UUID para gerar uma chave única

      // Cria uma nova entrada no SoftwaresAdquiridos
      const novoSoftware = await SoftwaresAdquiridos.create({
          nome: software.nome, // Nome do software adquirido
          chaveproduto: chaveProduto,
          nif: pedido.nif
      });

      // Cria uma nova entrada no LicencasAtribuidas
      const novaLicenca = await LicencasAtribuidas.create({
          chaveproduto: chaveProduto,
          nomepc: 'PC do Cliente', // Ajuste conforme necessário
          dataatri: new Date(),
          idatribuida: uuidv4() // Usando UUID para gerar um ID único para a licença
      });

      res.json({
          message: 'Purchase successful',
          chaveProduto: chaveProduto,
          softwareInfo: novoSoftware
      });
  } catch (error) {
      res.status(500).json({ error: 'Error processing purchase success' });
  }
};







module.exports = shopController;