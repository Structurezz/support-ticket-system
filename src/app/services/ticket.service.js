import Ticket from '../models/ticket.schema.js';

export default class TicketService {
  // Create a new ticket
  async createTicket(subject, description, priority) {
    try {
      const newTicket = new Ticket({ subject, description, priority });
      await newTicket.save();
      return newTicket;
    } catch (error) {
      throw new Error(`Error creating ticket: ${error.message}`);
    }
  }

  // Get all tickets
  async getAllTickets() {
    try {
      return await Ticket.find();
    } catch (error) {
      throw new Error(`Error retrieving tickets: ${error.message}`);
    }
  }

  // Get ticket by ID
  async getTicketById(id) {
    try {
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        throw new Error('Ticket not found');
      }
      return ticket;
    } catch (error) {
      throw new Error(`Error retrieving ticket: ${error.message}`);
    }
  }

  // Update ticket status
  async updateTicketStatus(id, status) {
    try {
      const ticket = await Ticket.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!ticket) {
        throw new Error('Ticket not found');
      }
      return ticket;
    } catch (error) {
      throw new Error(`Error updating ticket status: ${error.message}`);
    }
  }

  // Delete a ticket
  async deleteTicket(id) {
    try {
      const ticket = await Ticket.findByIdAndDelete(id);
      if (!ticket) {
        throw new Error('Ticket not found');
      }
      return { message: 'Ticket deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting ticket: ${error.message}`);
    }
  }
}
