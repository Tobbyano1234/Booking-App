"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const helperMethods_1 = require("../utils/helperMethods");
const JWT_SECRET = process.env.JWT_SECRET;
const auth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return (0, helperMethods_1.errorResponse)(res, "Kindly sign in as a User", http_status_1.default.UNAUTHORIZED);
        }
        const verified = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!verified) {
            return (0, helperMethods_1.errorResponse)(res, "User not verified, you cannot access this route", http_status_1.default.UNAUTHORIZED);
        }
        next();
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.errorResponse)(res, "User is not logged in", http_status_1.default.FORBIDDEN);
    }
};
exports.auth = auth;
