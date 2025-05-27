const express = require("express");
const { Card, validateCard, generateBizNumber, validateBizNumber } = require("../model/card_model");
const router = express.Router();
const authMW = require("../middleware/auth");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
    const cards = await Card.find({});
    res.json(cards);
});

router.get("/my-cards", authMW, async (req, res) => {
    const cards = await Card.find({ user_id: req.user._id })

    res.json(cards);
});

router.get("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const card = await Card.findById(req.params.id);
    if (!card) {
        res.status(400).send("Card not found.");
        return;
    }

    res.json(card);
});

router.post("/", authMW, async (req, res) => {
    const { error, value } = validateCard.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const biz = req.user.isBusiness;
    const admin = req.user.isAdmin;

    if (!biz && !admin) {
        res.status(400).send("Only Business users or Admin users can get a response from this API.");
        return;
    }

    const card = await new Card({
        ...value,
        user_id: req.user._id,
        bizNumber: await generateBizNumber()
    }).save();

    res.json(card);
});

router.put("/:id", authMW, async (req, res) => {
    const { error, value } = validateCard.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const card = await Card.findById(req.params.id);
    if (!card) {
        res.status(400).send("Card not found.");
        return;
    }

    if (card.user_id.toString() !== req.user._id) {
        res.status(400).send("Only the user who created the card can update it.");
        return;
    }
    const updateCard = await Card.findByIdAndUpdate(req.params.id, value, { new: true });
    res.json(updateCard);
});

router.patch("/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const likeCard = await Card.findById(req.params.id);
    if (!likeCard) {
        res.status(400).send("Card not found.");
        return;
    }

    if (likeCard.likes.includes(req.user._id)) {
        const indexId = likeCard.likes.indexOf(req.user._id);
        likeCard.likes.splice(indexId, 1);
        likeCard.save();
    } else {
        likeCard.likes.push(req.user._id);
        likeCard.save();
    }

    res.json(likeCard);
});

router.patch("/:id/business-number", authMW, async (req, res) => {
    console.log(req.body)
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    if (!req.user.isAdmin) {
        res.status(400).send("Only an admin can change the business number.");
        return;
    };

    const { error } = validateBizNumber.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const card = await Card.findByIdAndUpdate(req.params.id, { bizNumber: req.body.bizNumber }, { new: true });
    if (!card) {
        res.status(400).send("Card not found.");
        return;
    }

    res.json(card);
});

router.delete("/:id", authMW, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("The value provided is not a valid ObjectId. Please return a valid MongoDB ObjectId (a 24-character hexadecimal string).");
        return;
    }

    const card = await Card.findById(req.params.id);
    if (!card) {
        res.status(400).send("Card not found.");
        return;
    }

    if (card.user_id.toString() !== req.user._id && !req.user.isAdmin) {
        res.status(400).send("Only the user who created the card or an admin user can delete a card.");
        return;
    }

    const deletedCard = await Card.findByIdAndDelete(req.params.id, { new: true });
    res.json(deletedCard);
});

module.exports = router;