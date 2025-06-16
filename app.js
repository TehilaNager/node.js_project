require("dotenv").config();
const connectDB = require('./lib/connectDB');
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("./helpers/custom_morgan");
const CustomStream = require("./helpers/custom_stream");

app.use(morgan(`:custom-date :method :full-url :status :response-time ms :body`, { stream: new CustomStream, skip: function (req, res) { return res.statusCode < 400 } }));

app.use(morgan(`:custom-date :method :full-url :status :response-time ms :body`))

app.use(cors());

app.use(express.json());

app.use("/users", require("./routes/user_route"));

app.use("/cards", require("./routes/card_route"));

const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
});
