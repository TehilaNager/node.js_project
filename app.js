require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("./helpers/custom_morgan");


console.log("Loaded PORT =", process.env.PORT);
console.log("Loaded NODE_ENV =", process.env.NODE_ENV);


app.use(morgan(`:custom-date :method :full-url :status :response-time ms`))

app.use(cors());

app.use(express.json());

app.use("/users", require("./routes/user_route"));

app.use("/cards", require("./routes/card_route"));

const PORT = process.env.PORT;

const connectDB = async () => {
    const mode = process.env.NODE_ENV;
    const uri = mode === "production" ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_DEV;
    mongoose.connect(uri)
        .then(() => {
            console.log("Successfully connected to database")
            app.listen(PORT, () => console.log(`listening on port ${PORT}`));
        }).catch((err) => console.log("Connection failed to database", err));
};

module.exports = connectDB;