import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


const user = {
  id: 'user_id_here', 
  email: 'user@example.com', 
  fullName: 'John Doe', 
};

// Generate the token
const token = jwt.sign(
  { id: user.id, email: user.email, fullName: user.fullName },
  process.env.JWT_SECRET, 
  { expiresIn: '1h' } 
);

console.log('Generated JWT:', token);
