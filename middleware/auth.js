const jwt = require("jsonwebtoken");

function authMW(req, res, next) {
    const token = req.headers["x-auth-token"];

    if (!token) {
        res.status(400).send("Access denied. No token provided.")
        return;
    }

    try {
        const paylod = jwt.verify(token, process.env.JWT_KEY);
        req.user = paylod;
        next();
    } catch (error) {
        res.status(400).send("Invalide token.")
    }
}

module.exports = authMW;