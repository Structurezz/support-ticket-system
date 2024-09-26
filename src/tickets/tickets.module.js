import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketSchema } from '../app/models/ticket.schema.js';
import { TicketsController } from '../app/controllers/tickets.controller.js';
import { TicketsService } from './tickets.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }]),  // Ticket schema
  ],
  controllers: [TicketsController],  // Controller for ticket routes
  providers: [TicketsService],  // Service for business logic
})
export class TicketsModule {}
