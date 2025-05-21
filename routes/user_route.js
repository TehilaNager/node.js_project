const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const authMW = require("../middleware/auth");
const { User, validateUser, validateSignIn } = require("../model/user_model");

router.post("/", async (req, res) => {
    const { error, value } = validateUser.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let user = await User.findOne({ email: req.body.email })
    if (user) {
        res.status(400).send("User already exists.");
        return;
    }

    user = await new User({
        ...value,
        password: await bcrypt.hash(req.body.password, 14)
    }).save();

    res.send(_.pick(user, ["_id", "name.first", "name.middle", "name.last", "phone", "email", "image.url", "image.alt", "address.state", "address.country", "address.city", "address.street", "address.houseNumber", "address.zip", "isBusiness", "isAdmin", "createdAt"]))
});

router.post("/login", async (req, res) => {
    const { error } = validateSignIn.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send("Invalide email.");
        return;
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword) {
        res.status(400).send("Invalide password.");
        return;
    }

    const token = jwt.sign({ _id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin }, process.env.JWT_KEY);

    res.send({ token });
});

router.get("/", authMW, async (req, res) => {
    if (!req.user.isAdmin) {
        res.status(400).send("Only an Admin user can get a response from this API.");
        return;
    }

    const users = await User.find({}, { password: 0 });

    res.json(users);
});

router.get("/:id", authMW, async (req, res) => {
    const isUser = req.params.id === req.user._id;
    const isAdmin = req.user.isAdmin;
    if (!isUser && !isAdmin) {
        res.status(400).send("Only a registered user or an Admin user can get a response from this API.")
        return;
    }

    const userById = await User.findById({ _id: req.params.id }, { password: 0 });

    if (!userById) {
        res.status(400).send("User not found.")
    }

    res.json(userById);
});

router.put("/:id", authMW, async (req, res) => {
    const { error, value } = validateUser.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const isUser = req.params.id === req.user._id;
    const isAdmin = req.user.isAdmin;
    if (!isUser && !isAdmin) {
        res.status(400).send("Only a registered user or an Admin user can get a response from this API.")
        return;
    }
    const editUser = await User.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!editUser) {
        res.status(400).send("User not found.")
    }
    const newUser = _.pick(editUser, ["_id", "name.first", "name.middle", "name.last", "phone", "email", "image.url", "image.alt", "address.state", "address.country", "address.city", "address.street", "address.houseNumber", "address.zip", "isBusiness", "isAdmin", "createdAt"]);

    res.json(newUser);
});

router.patch("/:id", authMW, async (req, res) => {
    const isUser = req.params.id === req.user._id;
    const isAdmin = req.user.isAdmin;
    if (!isUser && !isAdmin) {
        res.status(400).send("Only a registered user or an Admin user can get a response from this API.")
        return;
    }

    const editStatusUser = await User.findById(req.params.id);

    if (!editStatusUser) {
        res.status(400).send("User not found.");
        return;
    }

    editStatusUser.isBusiness = !editStatusUser.isBusiness;
    editStatusUser.save();

    const newUser = _.pick(editStatusUser, ["_id", "name.first", "name.middle", "name.last", "phone", "email", "image.url", "image.alt", "address.state", "address.country", "address.city", "address.street", "address.houseNumber", "address.zip", "isBusiness", "isAdmin", "createdAt"]);

    res.json(newUser);
})

router.delete("/:id", authMW, async (req, res) => {
    const isUser = req.params.id === req.user._id;
    const isAdmin = req.user.isAdmin;
    if (!isUser && !isAdmin) {
        res.status(400).send("Only a registered user or an Admin user can get a response from this API.")
        return;
    }

    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
        res.status(400).send("User not found.");
        return;
    }

    const newUser = _.pick(deleteUser, ["_id", "name.first", "name.middle", "name.last", "phone", "email", "image.url", "image.alt", "address.state", "address.country", "address.city", "address.street", "address.houseNumber", "address.zip", "isBusiness", "isAdmin", "createdAt"]);

    res.json(newUser);
})

module.exports = router;