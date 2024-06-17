const Tickets = require('../models/tickets');

const adminController = {};

// Listar todos os tickets ou filtrar por estado
adminController.listTickets = async (req, res) => {
    const { estado } = req.query; // Captura o parâmetro 'estado' da query string
    const whereCondition = estado ? { estado } : {};

    try {
        const tickets = await Tickets.findAll({ where: whereCondition });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tickets' });
    }
};

// Atualizar o estado de um ticket (para resolvido ou não resolvido)
adminController.updateTicketStatus = async (req, res) => {
    const { idticket } = req.params;
    const { estado } = req.body;

    try {
        const ticket = await Tickets.findByPk(idticket);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        ticket.estado = estado;
        await ticket.save();

        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Error updating ticket status' });
    }
};




/*  Sugestão Front end para '/tickets/admin'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketsAdmin = () => {
    const [tickets, setTickets] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`/tickets/admin`, { params: { estado: filter } });
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [filter]);

    const updateTicketStatus = async (idticket, estado) => {
        try {
            const response = await axios.put(`/tickets/admin/${idticket}`, { estado });
            setTickets(tickets.map(ticket => (ticket.idticket === idticket ? response.data : ticket)));
        } catch (error) {
            console.error('Error updating ticket status:', error);
        }
    };

    return (
        <div>
            <h1>Administração de Tickets</h1>
            <div>
                <label>Filtrar por estado:</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value=''>Todos</option>
                    <option value='Resolvido'>Resolvido</option>
                    <option value='Por Resolver'>Por Resolver</option>
                    <option value='Não Resolvido'>Não Resolvido</option>
                </select>
            </div>
            <ul>
                {tickets.map(ticket => (
                    <li key={ticket.idticket}>
                        <p>{ticket.assunto}</p>
                        <p>Estado: {ticket.estado}</p>
                        <button onClick={() => updateTicketStatus(ticket.idticket, 'Resolvido')}>Marcar como Resolvido</button>
                        <button onClick={() => updateTicketStatus(ticket.idticket, 'Não Resolvido')}>Marcar como Não Resolvido</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TicketsAdmin;


*/

module.exports = adminController;

