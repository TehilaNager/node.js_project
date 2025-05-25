const winston = require("winston");

function printError() {
    const logger = winston.createLogger({
        transports: [new winston.transports.File({ filename: `${new Date().toISOString().slice(0, 10)}.js`, level: 'error' })]
    })
    return logger;
}

module.exports = printError;