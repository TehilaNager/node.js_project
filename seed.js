const { User } = require("./model/user_model")
const { Card } = require("./model/card_model");
const connectDB = require("./app");
const data = require("./initialData/data");

const initialData = data();

async function seedAll() {
    try {
        await User.deleteMany();
        await Card.deleteMany();

        await User.insertMany((await initialData).users);
        await Card.insertMany((await initialData).cards)
    } catch (err) {
        console.log(err);
    }
};

connectDB().then(() => {
    seedAll();
})
