const router = require('express').Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER (Sign Up)
router.post('/register', async (req, res) => {
    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: req.body.email });
        if (existingAdmin) return res.status(400).send("Email already exists");

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new admin
        const newAdmin = new Admin({
            email: req.body.email,
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).send("Admin registered successfully!");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 2. LOGIN (Sign In)
router.post('/login', async (req, res) => {
    try {
        // Check if email exists
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) return res.status(400).send("Email not found");

        // Check if password is correct
        const validPass = await bcrypt.compare(req.body.password, admin.password);
        if (!validPass) return res.status(400).send("Invalid password");

        // Create and assign a token (The "ID Card")
        const token = jwt.sign({ _id: admin._id }, 'MY_SECRET_KEY');
        res.header('auth-token', token).send({ token });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;