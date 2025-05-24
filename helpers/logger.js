const winston = require("winston");

function printError(req, res) {
    const logger = winston.createLogger({
        transports: [new winston.transports.File({ filename: `${new Date().toISOString().slice(0, 10)}.js`, level: 'error' })]
    })

    if (req.status = 400) {
        return logger;
    }
}

module.exports = printError;