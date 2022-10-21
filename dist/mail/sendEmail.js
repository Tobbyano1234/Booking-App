"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv").config();
const forMailUser = process.env.GMAIL_USER;
const forMailPass = process.env.GMAIL_PASS;
const fromUser = process.env.FROM;
const transport = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: forMailUser,
        pass: forMailPass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendEmail = (from, to, subject, html) => {
    return new Promise((resolve, reject) => {
        transport.sendMail({ from: fromUser, subject, to, html }, (err, info) => {
            if (err)
                reject(err);
            resolve(info);
        });
    });
};
exports.sendEmail = sendEmail;
