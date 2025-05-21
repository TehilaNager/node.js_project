const mongoose = require("mongoose");
const Joi = require("joi")
const _ = require("lodash")

const schemaUser = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 256,
        },
        middle: {
            type: String,
            maxlength: 256,
        },
        last: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 256,
        }
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
        maxlength: 256,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
    image: {
        url: {
            type: String,
            minlength: 14,
            default: "https://www.w3schools.com/howto/img_avatar.png"
        },
        alt: {
            type: String,
            minlength: 2,
            maxlength: 256,
            default: "Default profile picture"
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
    isBusiness: {
        type: Boolean,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", schemaUser, "users");

const messages = {
    'number.min': '{#label} must be at least 2 characters long.',
    'number.max': '{#label} must be at most 256 characters long.',
    'string.min': '{#label} must be at least {#limit} characters long.',
    'string.max': '{#label} must be at most {#limit} characters long.',
    "number.empty": "{#label} is required",
    "string.empty": "{#label} is required",
    'number.base': "{#label} must be a number",
    'string.base': "{#label} must be a string",
    'string.uri': "{#label} must be a valid uri",
}

const validate = {
    name: {
        first: Joi.string().min(2).max(256).required().label("First Name").messages(messages),
        middle: Joi.string().min(2).max(256).default("").label("Middle Name").messages(messages),
        last: Joi.string().min(2).max(256).required().label("Last Name").messages(messages)
    },
    phone: Joi.string().min(9).max(11).required(),
    email: Joi.string().min(5).max(256).email().required(),
    password: Joi.string().min(7).max(20).required(),
    image: {
        url: Joi.string().min(14).uri().allow("").label("Url").messages(messages),
        alt: Joi.string().min(2).max(256).allow("").label("Alt").messages(messages)
    },
    address: {
        state: Joi.string().min(2).max(256).default("not defined").label("State").messages(messages),
        country: Joi.string().min(2).max(256).required().label("Country").messages(messages),
        city: Joi.string().min(2).max(256).required().label("City").messages(messages),
        street: Joi.string().min(2).max(256).required().label("Street").messages(messages),
        houseNumber: Joi.number().min(10).max(9_999_999_999).required().label("House number").messages(messages),
        zip: Joi.number().min(10).max(9_999_999_999).default(0).label("Zip").messages(messages)
    },
    isBusiness: Joi.boolean().required()
}

const validateUser = Joi.object(validate).required();

const validateSignIn = Joi.object(_.pick(validate, ["email", "password"]));

module.exports = {
    User,
    validateUser,
    validateSignIn
}