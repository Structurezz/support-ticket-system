// app/validators/ticketValidator.js
import { body, param } from 'express-validator';

// Validate ticket creation
export const validateTicket = [
  body('subject').notEmpty().withMessage('Subject is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
];

// Validate ticket status update
export const validateTicketStatus = [
  param('id').isMongoId().withMessage('Invalid ticket ID'),
  body('status').isIn(['open', 'in-progress', 'closed']).withMessage('Status must be open, in-progress, or closed'),
];
