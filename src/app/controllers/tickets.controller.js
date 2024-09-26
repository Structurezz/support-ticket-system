import Ticket from '../models/ticket.schema.js';
import { TicketService } from '../services/ticket.service.js';

const ticketService = new TicketService();

// Create a new ticket
export const createTicket = async (req, res) => {
  const { subject, description, priority } = req.body;

  try {
    const newTicket = await ticketService.createTicket({ subject, description, priority });
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Failed to create ticket', error: error.message });
  }
};

// Get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error retrieving tickets:', error);
    res.status(500).json({ message: 'Failed to retrieve tickets', error: error.message });
  }
};

// Get ticket by ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error retrieving ticket:', error);
    res.status(500).json({ message: 'Failed to retrieve ticket', error: error.message });
  }
};

// Update ticket status
export const updateTicketStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const ticket = await ticketService.updateTicketStatus(req.params.id, status);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ message: 'Failed to update ticket status', error: error.message });
  }
};

// Delete a ticket
export const deleteTicket = async (req, res) => {
  try {
    const ticket = await ticketService.deleteTicket(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ message: 'Failed to delete ticket', error: error.message });
  }
};
