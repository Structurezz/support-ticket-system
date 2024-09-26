
import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';
import { TicketSchema } from '../app/models/ticket.schema.js';

@Injectable()
export class TicketsService {
  constructor() {
    this.ticketModel = mongoose.model('Ticket', TicketSchema);
  }

  async createTicket(subject, description, priority) {
    const newTicket = new this.ticketModel({ subject, description, priority });
    return newTicket.save();
  }

  async getAllTickets() {
    return this.ticketModel.find().exec();
  }

  async getTicketById(id) {
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async updateTicketStatus(id, status) {
    const updatedTicket = await this.ticketModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    if (!updatedTicket) throw new NotFoundException('Ticket not found');
    return updatedTicket;
  }

  async deleteTicket(id) {
    const result = await this.ticketModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Ticket not found');
    return result;
  }
}
