const morgan = require("morgan");

morgan.token("custom-date", () => {
    const date = new Date();
    return date.toLocaleString("he-IL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
});

morgan.token("full-url", (req) => {
    return `${req.protocol}://${req.get("host")}${req.originalUrl}`;
});

morgan.token("body", (req, res) => {
    return res.statusMessage;
});

module.exports = morgan;