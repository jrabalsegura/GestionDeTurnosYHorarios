const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = {uid, name};

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                reject('Token could not be generated');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
	generateJWT
}

