import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword } from '../app/controllers/authController.js';
import { authMiddleware } from '../app/middleware/authMiddleware.js';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Rate limiter for login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many login attempts from this IP, please try again later.'
});

// User registration (public)
router.post('/register', [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, registerUser);

router.post('/login', loginLimiter, loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword); 

// Protected routes (these routes require the user to be authenticated)
router.get('/protected-route', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route' });
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default router;
