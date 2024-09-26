import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High'], // Allowed values for priority
    required: true 
  },
  status: { type: String, default: 'Open' },
});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;
