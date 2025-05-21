const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const morgan = require("./helpers/logger");

app.use(morgan(`:custom-date :method :full-url :status :response-time ms`))

app.use(cors());

app.use(express.json());

app.use("/users", require("./routes/user_route"));

app.use("/cards", require("./routes/card_route"));

const PORT = process.env.PORT;

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Successfully connected to database")
            app.listen(PORT, () => console.log(`listening on port ${PORT}`));
        }).catch((err) => console.log("Connection failed to database", err));
};

module.exports = connectDB;