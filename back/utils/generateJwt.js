require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJwt = (email) => {
    return new Promise((resolve, reject) => {
        const payload = { email: email };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '4h',
            },
            (err, token) => {
                if (err) {
                    reject('Could not generate JWT');
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = generateJwt;