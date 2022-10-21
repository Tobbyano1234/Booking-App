"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.errorResponse = exports.serverError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const serverError = (res) => {
    return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong, try again later",
    });
};
exports.serverError = serverError;
const errorResponse = (res, message, code) => {
    return res.status(code).json({
        success: false,
        message,
    });
};
exports.errorResponse = errorResponse;
const successResponse = (res, message, code, data) => {
    return res.status(code).json({
        success: true,
        message,
        data,
    });
};
exports.successResponse = successResponse;
