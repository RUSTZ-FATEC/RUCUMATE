require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_TOKEN;

const auth = (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Token is not valid' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'Token is not supplied' });
    }
};

module.exports = auth;