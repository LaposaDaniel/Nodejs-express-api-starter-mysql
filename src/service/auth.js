const { secret } = require('../config.json');
const { timeGate } = require('../config.json');
var jwt = require('jsonwebtoken');

const milliseconds = (
    ((
        (
            (
                (timeGate.day * 24) + timeGate.hour // hour
            ) * 60) + timeGate.minute // minute
    ) * 60) + timeGate.seconds //seconds
) * 1000; //milliseconds
module.exports = authorize;

function authorize(req, res, next) {
    const authorization = req.header('authorization');
    if (!authorization) {
        return res.status(401).json({ error: true, message: 'Unauthorized1' });
    }

    jwt.verify(authorization.split(' ')[1], secret, function (err, decoded) {
        if (!decoded) {
            return res.status(401).json({ error: true, message: 'Unauthorized2' });
        }
        req.user = decoded;

        if (!req.user.loginDate || new Date().getTime() - milliseconds > req.user.loginDate) {
            return res.status(401).json({ error: true, message: 'Unauthorized3-4' });
        }

        next()
    });
}