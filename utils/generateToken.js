const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1h',
    });

    return token;
}

module.exports = generateToken;
