const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// In-memory user store for demo purposes.
// Replace with a real database (e.g. MongoDB, PostgreSQL) in production.
const users = [{ username: 'admin', passwordHash: bcrypt.hashSync('password', 12) }];

/**
 * POST /api/auth/register
 * Body: { username, password }
 */
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const existing = users.find((u) => u.username === username);
    if (existing) {
        return res.status(409).json({ message: 'Username already taken.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    users.push({ username, passwordHash });

    res.status(201).json({ message: 'User registered successfully.' });
});

/**
 * POST /api/auth/login
 * Body: { username, password }
 * Returns: { token }
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('Current users:', users);
    console.log('Login attempt:', username, password);

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    console.log('Password match:', passwordMatch);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({ token });
});

module.exports = router;
