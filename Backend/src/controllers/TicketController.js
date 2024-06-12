// controllers/SupportController.js
const Support = require('../models/Support');
const User = require('../models/User');

const supportController = {};

// List all support tickets for a user
supportController.listForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const tickets = await Support.findAll({ where: { userId } });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching support tickets' });
  }
};

// Get details of a specific support ticket
supportController.getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Support.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Support ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching support ticket details' });
  }
};

// Create a new support ticket
supportController.create = async (req, res) => {
  try {
    const { userId, subject, description } = req.body;
    const ticket = await Support.create({ userId, subject, description });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error creating support ticket' });
  }
};

// Update a support ticket
supportController.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, description, status } = req.body;
    const ticket = await Support.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Support ticket not found' });
    }
    await ticket.update({ subject, description, status });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error updating support ticket' });
  }
};

// Delete a support ticket
supportController.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Support.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Support ticket not found' });
    }
    await ticket.destroy();
    res.json({ message: 'Support ticket deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting support ticket' });
  }
};

module.exports = supportController;
