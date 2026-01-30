const router = require('express').Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Password validation helper
const validatePassword = (password) => {
    if (password.length < 6) {
        return 'Password must be at least 6 characters long';
    }
    if (!/\d/.test(password)) {
        return 'Password must contain at least one number';
    }
    return null;
};

// 1. REGISTER (Sign Up)
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate password strength
        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json({ error: passwordError });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully!' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// 2. LOGIN (Sign In)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            // Generic error message to prevent email enumeration
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check if password is correct
        const validPass = await bcrypt.compare(password, admin.password);
        if (!validPass) {
            // Same generic error message
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Create and assign a token with 1-hour expiration
        const jwtSecret = process.env.JWT_SECRET || 'MY_SECRET_KEY';
        const token = jwt.sign(
            { _id: admin._id },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            token,
            message: 'Login successful'
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

module.exports = router;