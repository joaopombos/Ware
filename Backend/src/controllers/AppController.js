const TipoSoftwares = require('../models/tipossoftwares');
const Orcamentos = require('../models/orcamentos');
const Clientes = require('../models/clientes');
const SoftwaresAdquiridos = require('../models/softwaresadquiridos');
const Addons = require('../models/addons');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

const adminController = {};

// Listar todos os softwares ou buscar por nome
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

// Atualizar um software específico
adminController.updateSoftware = async (req, res) => {
    const { idproduto } = req.params;
    const { nome, descricao, categoria, versao, precoproduto, logotipo, imagenssoftware } = req.body;

    try {
        const software = await TipoSoftwares.findByPk(idproduto);
        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }

        console.log('Dados recebidos:', nome, descricao, categoria, versao, precoproduto, logotipo, imagenssoftware);

        // Atualiza os atributos do software
        await software.update({ nome, descricao, categoria, versao, precoproduto, logotipo, imagenssoftware });

        console.log('Software atualizado:', software);

        res.json(software);
    } catch (error) {
        console.error('Erro ao atualizar software:', error);
        res.status(500).json({ error: 'Error updating software' });
    }
};

// Excluir um software específico
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


/* Sugestão Frontend '/edit/admin' e '/list/admin'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListAdmin = () => {
    const [softwares, setSoftwares] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSoftware, setSelectedSoftware] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        versao: '',
        precoproduto: '',
        logotipo: '',
        imagenssoftware: ''
    });

    useEffect(() => {
        const fetchSoftwares = async () => {
            try {
                const response = await axios.get('/list/admin', { params: { query: searchQuery } });
                setSoftwares(response.data);
            } catch (error) {
                console.error('Error fetching softwares:', error);
            }
        };

        fetchSoftwares();
    }, [searchQuery]);

    const handleSoftwareSelect = (software) => {
        setSelectedSoftware(software);
        setFormData({
            nome: software.nome || '',
            descricao: software.descricao || '',
            categoria: software.categoria || '',
            versao: software.versao || '',
            precoproduto: software.precoproduto || '',
            logotipo: software.logotipo || '',
            imagenssoftware: software.imagenssoftware || ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/edit/admin/${selectedSoftware.idproduto}`, formData);
            setSelectedSoftware(response.data);
            setSoftwares(softwares.map(software => software.idproduto === response.data.idproduto ? response.data : software));
        } catch (error) {
            console.error('Error updating software:', error);
        }
    };

    const handleDeleteSoftware = async (idproduto) => {
        try {
            await axios.delete(`/delete/admin/${idproduto}`);
            setSoftwares(softwares.filter(software => software.idproduto !== idproduto));
        } catch (error) {
            console.error('Error deleting software:', error);
        }
    };

    return (
        <div>
            <h1>Listar e Editar Softwares</h1>
            <div>
                <h2>Procurar Software:</h2>
                <input
                    type="text"
                    placeholder="Procurar software por nome"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ul>
                    {softwares.map(software => (
                        <li key={software.idproduto}>
                            <span onClick={() => handleSoftwareSelect(software)}>{software.nome}</span>
                            <button onClick={() => handleSoftwareSelect(software)}>Editar</button>
                            <button onClick={() => handleDeleteSoftware(software.idproduto)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
            {selectedSoftware && (
                <div>
                    <h2>Editando: {selectedSoftware.nome}</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label>Nome:</label>
                            <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Descrição:</label>
                            <textarea name="descricao" value={formData.descricao} onChange={handleInputChange}></textarea>
                        </div>
                        <div>
                            <label>Categoria:</label>
                            <input type="text" name="categoria" value={formData.categoria} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Versão:</label>
                            <input type="text" name="versao" value={formData.versao} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Preço:</label>
                            <input type="number" name="precoproduto" value={formData.precoproduto} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Logotipo:</label>
                            <input type="text" name="logotipo" value={formData.logotipo} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Imagens:</label>
                            <input type="text" name="imagenssoftware" value={formData.imagenssoftware} onChange={handleInputChange} />
                        </div>
                        <button type="submit">Salvar Alterações</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ListAdmin;

*/



// Adicionar um novo software
adminController.addSoftware = async (req, res) => {
    try {
        const { nome, descricao, categoria, versao, precoproduto, idproduto, logotipo, imagenssoftware } = req.body;
    
        console.log('Dados recebidos para adicionar software:', req.body);
    
        // Validar se o ID do produto foi fornecido
        if (!idproduto) {
          return res.status(400).json({ error: 'ID do produto não fornecido.' });
        }
    
        // Criar o novo software no banco de dados
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
    
        // Responder com o novo software criado
        res.status(201).json(novoSoftware);
      } catch (error) {
        console.error('Erro ao adicionar software:', error);
        res.status(500).json({ error: 'Erro ao adicionar software.' });
      }
  };



/* Sugestão Frontend '/add/admin'

import React, { useState } from 'react';
import axios from 'axios';

const AddAdmin = () => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        versao: '',
        precoproduto: '',
        logotipo: '',
        imagenssoftware: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/add/admin', formData);
            alert('Software adicionado com sucesso!');
            setFormData({
                nome: '',
                descricao: '',
                categoria: '',
                versao: '',
                precoproduto: '',
                logotipo: '',
                imagenssoftware: ''
            });
        } catch (error) {
            console.error('Error adding software:', error);
            alert('Erro ao adicionar software.');
        }
    };

    return (
        <div>
            <h1>Adicionar Novo Software</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea name="descricao" value={formData.descricao} onChange={handleInputChange}></textarea>
                </div>
                <div>
                    <label>Categoria:</label>
                    <input type="text" name="categoria" value={formData.categoria} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Versão:</label>
                    <input type="text" name="versao" value={formData.versao} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Preço:</label>
                    <input type="number" name="precoproduto" value={formData.precoproduto} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Logotipo:</label>
                    <input type="text" name="logotipo" value={formData.logotipo} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Imagens:</label>
                    <input type="text" name="imagenssoftware" value={formData.imagenssoftware} onChange={handleInputChange} />
                </div>
                <button type="submit">Adicionar Software</button>
            </form>
        </div>
    );
};

export default AddAdmin;


*/



// Listar todos os orçamentos
adminController.listBudgets = async (req, res) => {
  try {
      const budgets = await Orcamentos.findAll();
      res.json(budgets);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching budgets' });
  }
};



/*  Sugestão Frontend '/budget/admin'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListBudgets = () => {
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await axios.get('/budget/admin');
                setBudgets(response.data);
            } catch (error) {
                console.error('Error fetching budgets:', error);
            }
        };

        fetchBudgets();
    }, []);

    return (
        <div>
            <h1>Lista de Orçamentos</h1>
            <ul>
                {budgets.map(budget => (
                    <li key={budget.idorc}>
                        <p>ID do Orçamento: {budget.idorc}</p>
                        <p>NIF: {budget.nif}</p>
                        <p>ID do Produto: {budget.idproduto}</p>
                        <p>Estado: {budget.estado}</p>
                        <p>Quantidade: {budget.quantidade}</p>
                        <p>Preço do Orçamento: {budget.precoorcamento}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListBudgets;

*/




// Buscar detalhes de um orçamento específico
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

// Enviar resposta por escrito para o email do comprador
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

        // Configurar o transporte de e-mail com o servidor SMTP do Elastic Email
        let transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com', // Servidor SMTP do Elastic Email
            port: 587, // Porta SMTP padrão para Elastic Email
            auth: {
                user: '76a8dd002@smtp-brevo.com', // Substitua pelo seu usuário Elastic Email
                pass: 'aIUpR5yJwXVBqLGN' // Substitua pela sua chave API Elastic Email
            }
        });

        // Configurar email
        let mailOptions = {
            from: '"Ware" <rodrigo.pina113@gmail.com>', // O mesmo email do usuário do transporter
            to: cliente.email, // E-mail do destinatário obtido do cliente
            subject: `Resposta ao Orçamento`,
            text: resposta // Conteúdo do e-mail
        };

        // Enviar email
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







/* Sugestão Frontend '/budget/admin/:idorca'

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BudgetDetails = () => {
    const { idorca } = useParams();
    const [budget, setBudget] = useState(null);
    const [response, setResponse] = useState('');

    useEffect(() => {
        const fetchBudgetDetails = async () => {
            try {
                const response = await axios.get(`/budget/admin/${idorca}`);
                setBudget(response.data);
            } catch (error) {
                console.error('Error fetching budget details:', error);
            }
        };

        fetchBudgetDetails();
    }, [idorca]);

    const handleInputChange = (e) => {
        setResponse(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/budget/admin/${idorca}/respond`, { resposta: response });
            alert('Resposta enviada com sucesso!');
            setResponse('');
        } catch (error) {
            console.error('Error sending response:', error);
            alert('Erro ao enviar resposta.');
        }
    };

    if (!budget) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Detalhes do Orçamento</h1>
            <p>ID do Orçamento: {budget.idorc}</p>
            <p>NIF: {budget.nif}</p>
            <p>ID do Produto: {budget.idproduto}</p>
            <p>Estado: {budget.estado}</p>
            <p>Quantidade: {budget.quantidade}</p>
            <p>Preço do Orçamento: {budget.precoorcamento}</p>

            <h2>Enviar Resposta</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Resposta:</label>
                    <textarea value={response} onChange={handleInputChange}></textarea>
                </div>
                <button type="submit">Enviar Resposta</button>
            </form>
        </div>
    );
};

export default BudgetDetails;

*/



// Listar todos os softwares adquiridos para a empresa do usuário logado
adminController.listAcquiredSoftwares = async (req, res) => {
    try {
        const nif = req.cookies.nif; // Busca o NIF dos cookies

        if (!nif) {
            return res.status(400).json({ error: 'NIF do usuário não fornecido nos cookies' });
        }

        // Encontrar o cliente pelo NIF do usuário logado
        const cliente = await Clientes.findOne({ where: { nif } });

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        // Listar todos os softwares adquiridos pela empresa do cliente
        const softwares = await SoftwaresAdquiridos.findAll({ where: { nif: cliente.emp_nif } });

        // Verifica se há softwares encontrados
        if (!softwares || softwares.length === 0) {
            return res.status(404).json({ error: 'Nenhum software adquirido encontrado para este cliente' });
        }

        res.json(softwares);
    } catch (error) {
        console.error('Erro ao buscar softwares adquiridos:', error);
        res.status(500).json({ error: 'Erro ao buscar softwares adquiridos' });
    }
};


/* Logica middleware e frontend para '/library'


// middlewares/auth.js
const jwt = require('jsonwebtoken');
const Clientes = require('../models/clientes');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const cliente = await Clientes.findOne({ where: { iduser: decoded.iduser } });
        if (!cliente) {
            throw new Error();
        }
        req.user = cliente;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

module.exports = { authenticate };




Frontend



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Library = () => {
    const [softwares, setSoftwares] = useState([]);

    useEffect(() => {
        const fetchSoftwares = async () => {
            try {
                const response = await axios.get('/library', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Supondo que o token está armazenado no localStorage
                    }
                });
                setSoftwares(response.data);
            } catch (error) {
                console.error('Error fetching acquired softwares:', error);
            }
        };

        fetchSoftwares();
    }, []);

    return (
        <div>
            <h1>Softwares Adquiridos</h1>
            <ul>
                {softwares.map(software => (
                    <li key={software.chaveproduto}>
                        <p>Nome: {software.nome}</p>
                        <p>Chave do Produto: {software.chaveproduto}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Library;
*/


// Listar addons de um software específico
adminController.listAddons = async (req, res) => {
    const { idproduto } = req.params;

    try {
        const addons = await Addons.findAll({ where: { idproduto } });
        res.json(addons);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching addons' });
    }
};




// Função para comparar versões e atualizar software se necessário
adminController.compareAndUpdateSoftware = async (req, res) => {
    const { chaveproduto } = req.params;

    try {
        // Buscar o software adquirido pela chave do produto
        const softwareAdquirido = await SoftwaresAdquiridos.findOne({ where: { chaveproduto } });
        if (!softwareAdquirido) {
            return res.status(404).json({ error: 'Acquired software not found' });
        }

        // Buscar o software no modelo de tipos de software
        const tipoSoftware = await TipoSoftwares.findOne({ where: { idproduto: softwareAdquirido.idproduto } });
        if (!tipoSoftware) {
            return res.status(404).json({ error: 'Software type not found' });
        }

        // Comparar as versões
        if (softwareAdquirido.versaoadquirida !== tipoSoftware.versao) {
            // Atualizar a entrada no modelo de softwares adquiridos
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

/* Sugestão front end 

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CompareSoftware = () => {
    const { chaveproduto } = useParams();
    const [software, setSoftware] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const compareAndUpdateSoftware = async () => {
            try {
                const response = await axios.get(`/library/${chaveproduto}/compare`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setSoftware(response.data.softwareAdquirido);
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error comparing and updating software:', error);
            }
        };

        compareAndUpdateSoftware();
    }, [chaveproduto]);

    if (!software) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Verificação de Versão do Software</h1>
            <p>{message}</p>
            <p>Nome do Software: {software.nome}</p>
            <p>Versão Adquirida: {software.versaoadquirida}</p>
        </div>
    );
};

export default CompareSoftware;


*/




module.exports = adminController;
