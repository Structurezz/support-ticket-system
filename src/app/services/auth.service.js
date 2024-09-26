import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export class AuthService {
  // Register a new user
  async registerUser(username, password) {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const user = new User({ username, password });
      await user.save();
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Login user
  async loginUser(username, password) {
    try {
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
