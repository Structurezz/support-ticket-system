import express from 'express';
import TicketService from '../app/services/ticket.service.js'; // Update import to TicketService
import { authMiddleware } from '../app/middleware/authMiddleware.js';

const router = express.Router();
const ticketService = new TicketService(); // Create an instance of TicketService

// Create a new ticket
router.post('/', authMiddleware, async (req, res) => {
  const { subject, description, priority } = req.body;
  try {
    const newTicket = await ticketService.createTicket(subject, description, priority);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tickets
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get ticket by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(error.message === 'Ticket not found' ? 404 : 500).json({ message: error.message });
  }
});

// Update ticket status
router.patch('/:id/status', authMiddleware, async (req, res) => {
  const { status } = req.body;
  try {
    const updatedTicket = await ticketService.updateTicketStatus(req.params.id, status);
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(error.message === 'Ticket not found' ? 404 : 500).json({ message: error.message });
  }
});

// Delete a ticket
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await ticketService.deleteTicket(req.params.id);
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(error.message === 'Ticket not found' ? 404 : 500).json({ message: error.message });
  }
});

export default router;
