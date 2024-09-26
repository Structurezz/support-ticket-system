// userController.js
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Register a new user
export const registerUser = async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = new User({ fullName, email, phoneNumber, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send welcome email after successful authentication
    const subject = 'Welcome Back!';
    const text = `Hello ${user.fullName},\n\nWelcome back to our service!`;
    const html = `<h1>Welcome Back, ${user.fullName}!</h1><p>Thank you for logging in!</p>`;
    
    // You can re-add email sending functionality here if needed later

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Create a reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Prepare the email options
    const subject = 'Password Reset';
    const text = `You requested a password reset. Click the link below to reset your password:\n\nhttp://localhost:5000/reset-password/${resetToken}`;
    const html = `<p>You requested a password reset. Click the link below to reset your password:</p><a href="http://localhost:5000/reset-password/${resetToken}">Reset Password</a>`;

    // You can re-add email sending functionality here if needed later

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
    user.password = hashedPassword; 
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
