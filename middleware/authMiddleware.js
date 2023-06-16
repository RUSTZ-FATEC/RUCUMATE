const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }

        User.findByPk(decoded.id)
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ message: 'User not found.' });
                }

                req.user = user;
                next();
            })
            .catch((error) => {
                console.error('Error retrieving user:', error);
                res.status(500).json({ message: 'Internal server error.' });
            });
    });
}

module.exports = authenticate;
