"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const helperMethods_1 = require("../utils/helperMethods");
const userModel_1 = __importDefault(require("../models/userModel"));
const JWT_SECRET = process.env.JWT_SECRET;
const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        const verified = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!token) {
            return (0, helperMethods_1.errorResponse)(res, "Kindly sign in as an Admin or User", http_status_1.default.UNAUTHORIZED);
        }
        const { _id, isAdmin } = verified;
        const admin = userModel_1.default.findOne({ _id, isAdmin });
        if (isAdmin === false) {
            return (0, helperMethods_1.errorResponse)(res, "Kindly sign in as a Admin", http_status_1.default.UNAUTHORIZED);
        }
        next();
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.errorResponse)(res, "Admin is not logged in", http_status_1.default.FORBIDDEN);
    }
};
exports.adminAuth = adminAuth;
