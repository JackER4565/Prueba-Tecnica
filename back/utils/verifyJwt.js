require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const bearer = req.headers.authorization;
    const token = bearer ? bearer.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Missing Token' });
    }

    jwt.verify(token, process.env.SECRETORPRIVATEKEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid Token', error: err.message });
        }

        req.user = decoded;
        next();
    });
}

module.exports = verifyJWT;
