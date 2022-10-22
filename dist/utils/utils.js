"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateLoginToken = exports.changePasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.updateUserSchema = exports.registerUserSchema = exports.updateHotelSchema = exports.createHotelSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createHotelSchema = joi_1.default.object({
    name: joi_1.default.string().max(255).required(),
    type: joi_1.default.string().max(255).required(),
    city: joi_1.default.string().max(255).required(),
    address: joi_1.default.string().max(255).required(),
    distance: joi_1.default.string().max(255).required(),
    photos: joi_1.default.string().max(255),
    title: joi_1.default.string().max(255).required(),
    description: joi_1.default.string().max(255).required(),
    rooms: joi_1.default.string().max(255),
    cheapestPrice: joi_1.default.string().max(255).required(),
    featured: joi_1.default.boolean().default(false),
});
exports.updateHotelSchema = joi_1.default.object({
    name: joi_1.default.string().max(255).required(),
    type: joi_1.default.string().max(255).required(),
    city: joi_1.default.string().max(255).required(),
    address: joi_1.default.string().max(255).required(),
    distance: joi_1.default.string().max(255).required(),
    photos: joi_1.default.string().max(255),
    title: joi_1.default.string().max(255).required(),
    description: joi_1.default.string().max(255).required(),
    rooms: joi_1.default.string().max(255),
    cheapestPrice: joi_1.default.string().max(255).required(),
});
exports.registerUserSchema = joi_1.default.object({
    fullName: joi_1.default.string().required(),
    userName: joi_1.default.string().lowercase().required(),
    email: joi_1.default.string().email().required(),
    phoneNumber: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirmPassword: joi_1.default.ref("password"),
    avatar: joi_1.default.string(),
    isAdmin: joi_1.default.boolean().default(false),
    isVerified: joi_1.default.boolean().default(false),
}).with("password", "confirmPassword");
exports.updateUserSchema = joi_1.default.object({
    fullName: joi_1.default.string().required(),
    // userName: Joi.string().lowercase().required(),
    // email: Joi.string().email().required(),
    phoneNumber: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    avatar: joi_1.default.string(),
});
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().trim().lowercase(),
    userName: joi_1.default.string().trim().lowercase(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
exports.forgotPasswordSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().trim().lowercase().required(),
});
exports.changePasswordSchema = joi_1.default.object()
    .keys({
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.any()
        .equal(joi_1.default.ref("password"))
        .required()
        .label("Confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
})
    .with("password", "confirmPassword");
const generateLoginToken = (user) => {
    const pass = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: "1d" });
};
exports.generateLoginToken = generateLoginToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
