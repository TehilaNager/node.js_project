const mongoose = require("mongoose")
const Joi = require("joi");
const _ = require("lodash");

const schemaCard = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    },
    subtitle: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 11
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
    },
    web: {
        type: String,
        required: true,
        minlength: 14
    },
    image: {
        url: {
            type: String,
            minlength: 14,
            default: "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg"
        },
        alt: {
            type: String,
            minlength: 2,
            maxlength: 256,
            default: "Business card image"
        }
    },
    address: {
        state: {
            type: String,
            minlength: 2,
            maxlength: 256
        },
        country: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 256
        },
        city: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 256
        },
        street: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 256
        },
        houseNumber: {
            type: Number,
            required: true,
            min: [10, '"House number" must be at least 2 characters long.'],
            max: [9_999_999_999, '"House number" must be at most 256 characters long.']
        },
        zip: {
            type: Number,
            required: true
        }
    },
    bizNumber: {
        type: Number,
        required: true,
        min: 100,
        max: 9_999_999_999
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Card = mongoose.model("Card", schemaCard, "cards");

async function generateBizNumber() {
    while (true) {
        const random = _.random(100, 9_999_999_999);
        const card = await Card.findOne({ bizNumber: random });
        if (!card) {
            return random;
        }
    }
}

const messages = {
    'number.min': '{#label} must be at least 2 characters long.',
    'number.max': '{#label} must be at most 256 characters long.',
    'string.min': '{#label} must be at least {#limit} characters long.',
    'string.max': '{#label} must be at most {#limit} characters long.',
    "number.empty": "{#label} is required.",
    "string.empty": "{#label} is required.",
    'number.base': "{#label} must be a number.",
    'string.base': "{#label} must be a string.",
    'string.uri': "{#label} must be a valid uri.",
}

const validateCard = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string().min(9).max(11).required(),
    email: Joi.string().min(5).email().required(),
    web: Joi.string().min(14).uri().required(),
    image: {
        url: Joi.string().min(14).uri().label("Url").messages(messages),
        alt: Joi.string().min(2).max(256).label("Alt").messages(messages)
    },
    address: {
        state: Joi.string().min(2).max(256).default("not defined").label("State").messages(messages),
        country: Joi.string().min(2).max(256).required().label("Country").messages(messages),
        city: Joi.string().min(2).max(256).required().label("City").messages(messages),
        street: Joi.string().min(2).max(256).required().label("Street").messages(messages),
        houseNumber: Joi.number().min(10).max(9_999_999_999).required().label("House number").messages(messages),
        zip: Joi.number().min(10).max(9_999_999_999).default(0).label("Zip").messages(messages)
    }
})

const validateBizNumber = Joi.object({
    bizNumber: Joi.number().required().min(100).max(9_999_999_999).messages({
        'number.base': 'Business number must be a number.',
        'number.empty': 'Business number is required.',
        'number.min': 'Business number must be at least 3 digits long.',
        'number.max': 'Business number must be at most 10 digits long.',
        'any.required': 'Business number is required.'
    })
}).strict();

module.exports = {
    Card, generateBizNumber, validateCard, validateBizNumber
}