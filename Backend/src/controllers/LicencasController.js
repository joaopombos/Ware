const SoftwaresAdquiridos = require('../models/softwaresadquiridos');
const LicencasAtribuidas = require('../models/licencasatribuidas');
const Clientes = require('../models/clientes');
const Tickets = require('../models/tickets');

const licencaController = {};

// Buscar detalhes do software e suas licenças
licencaController.getSoftwareLicenses = async (req, res) => {
    const { chaveproduto } = req.params;

    try {
        const software = await SoftwaresAdquiridos.findOne({ where: { chaveproduto } });
        if (!software) {
            return res.status(404).json({ error: 'Software not found' });
        }

        const licenses = await LicencasAtribuidas.findAll({ where: { chaveproduto } });
        res.json({ software, licenses });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching software licenses' });
    }
};

licencaController.updateLicense = async (req, res) => {
    const { chaveproduto } = req.params;
    const { idatribuida, nomepc } = req.body;

    try {
        const license = await LicencasAtribuidas.findOne({ where: { idatribuida, chaveproduto } });
        if (!license) {
            return res.status(404).json({ error: 'License not found' });
        }

        await license.update({ 
            nomepc, 
            dataatri: new Date() // Update dataatri to the current date
        });
        res.json(license);
    } catch (error) {
        res.status(500).json({ error: 'Error updating license' });
    }
};


// Remover uma licença
licencaController.removeLicense = async (req, res) => {
    const { idatribuida } = req.params;

    try {
        const license = await LicencasAtribuidas.findByPk(idatribuida);
        if (!license) {
            return res.status(404).json({ error: 'License not found' });
        }

        await license.destroy();
        res.json({ message: 'License removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing license' });
    }
};

// Enviar um ticket
licencaController.sendTicket = async (req, res) => {
    const { chaveproduto } = req.params;
    const { nif, assunto, descricao } = req.body;

    try {
        const ticket = await Tickets.create({
            nif,
            chaveproduto,
            assunto,
            descricao,
            dataabert: new Date(),
            estado: 'Por Resolver'
        });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Error sending ticket' });
    }
};

/* Sugestão FrontEnd '/license'

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const License = () => {
    const { chaveproduto } = useParams();
    const [software, setSoftware] = useState(null);
    const [licenses, setLicenses] = useState([]);
    const [newLicense, setNewLicense] = useState({ nomepc: '', nif: '' });
    const [ticket, setTicket] = useState({ assunto: '', descricao: '' });

    useEffect(() => {
        const fetchSoftwareLicenses = async () => {
            try {
                const response = await axios.get(`/license/${chaveproduto}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setSoftware(response.data.software);
                setLicenses(response.data.licenses);
            } catch (error) {
                console.error('Error fetching software licenses:', error);
            }
        };

        fetchSoftwareLicenses();
    }, [chaveproduto]);

    const handleInputChange = (e, setState) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleLicenseSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/license/${chaveproduto}/distribute`, newLicense, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setLicenses([...licenses, response.data]);
            setNewLicense({ nomepc: '', nif: '' });
        } catch (error) {
            console.error('Error distributing license:', error);
        }
    };

    const handleLicenseRemove = async (idatribuida) => {
        try {
            await axios.delete(`/license/${idatribuida}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setLicenses(licenses.filter(license => license.idatribuida !== idatribuida));
        } catch (error) {
            console.error('Error removing license:', error);
        }
    };

    const handleTicketSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/license/${chaveproduto}/ticket`, ticket, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTicket({ assunto: '', descricao: '' });
            alert('Ticket enviado com sucesso!');
        } catch (error) {
            console.error('Error sending ticket:', error);
        }
    };

    if (!software) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Gestão de Licenças para {software.nome}</h1>
            <h2>Licenças Distribuídas</h2>
            <ul>
                {licenses.map(license => (
                    <li key={license.idatribuida}>
                        <p>Nome do PC: {license.nomepc}</p>
                        <p>NIF: {license.nif}</p>
                        <button onClick={() => handleLicenseRemove(license.idatribuida)}>Remover Licença</button>
                    </li>
                ))}
            </ul>
            <h2>Distribuir Nova Licença</h2>
            <form onSubmit={handleLicenseSubmit}>
                <div>
                    <label>Nome do PC:</label>
                    <input type="text" name="nomepc" value={newLicense.nomepc} onChange={(e) => handleInputChange(e, setNewLicense)} />
                </div>
                <div>
                    <label>NIF:</label>
                    <input type="text" name="nif" value={newLicense.nif} onChange={(e) => handleInputChange(e, setNewLicense)} />
                </div>
                <button type="submit">Distribuir Licença</button>
            </form>
            <h2>Enviar Ticket</h2>
            <form onSubmit={handleTicketSubmit}>
                <div>
                    <label>Assunto:</label>
                    <input type="text" name="assunto" value={ticket.assunto} onChange={(e) => handleInputChange(e, setTicket)} />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea name="descricao" value={ticket.descricao} onChange={(e) => handleInputChange(e, setTicket)}></textarea>
                </div>
                <button type="submit">Enviar Ticket</button>
            </form>
        </div>
    );
};

export default License;

*/

module.exports = licencaController;
