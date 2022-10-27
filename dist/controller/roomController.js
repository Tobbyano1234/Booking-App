"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllRooms = exports.GetRoom = exports.DeleteRoom = exports.UpdateRoom = exports.CreateRoom = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helperMethods_1 = require("../utils/helperMethods");
const userModel_1 = __importDefault(require("../models/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const roomModel_1 = __importDefault(require("../models/roomModel"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const CreateRoom = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const { _id } = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const userData = await userModel_1.default.findById({ _id });
        if (!userData) {
            (0, helperMethods_1.errorResponse)(res, "Kindly sign in as user", http_status_1.default.UNAUTHORIZED);
        }
        const newRoom = new roomModel_1.default({ ...req.body, user: _id });
        const record = await newRoom.save();
        return (0, helperMethods_1.successResponse)(res, "Room profile created successfully", http_status_1.default.CREATED, record);
    }
    catch (error) {
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.CreateRoom = CreateRoom;
const UpdateRoom = async (req, res, next) => {
    const roomData = req.body;
    const { id } = req.params;
    try {
        const record = await roomModel_1.default.findByIdAndUpdate(id, {
            $set: roomData,
        }, { new: true });
        return (0, helperMethods_1.successResponse)(res, "Room profile updated successfully", http_status_1.default.OK, record);
    }
    catch (error) {
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.UpdateRoom = UpdateRoom;
const DeleteRoom = async (req, res, next) => {
    const { id } = req.params;
    try {
        const record = await roomModel_1.default.findByIdAndDelete(id);
        return (0, helperMethods_1.successResponse)(res, "Room profile deleted successfully", http_status_1.default.OK, record);
    }
    catch (error) {
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.DeleteRoom = DeleteRoom;
const GetRoom = async (req, res, next) => {
    const { id } = req.params;
    try {
        const record = await roomModel_1.default.findById(id);
        return (0, helperMethods_1.successResponse)(res, "Room profile fetched successfully", http_status_1.default.OK, record);
    }
    catch (error) {
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.GetRoom = GetRoom;
const GetAllRooms = async (req, res, next) => {
    try {
        const record = await roomModel_1.default.find();
        return (0, helperMethods_1.successResponse)(res, "All Rooms profiles fetched successfully", http_status_1.default.OK, record);
    }
    catch (error) {
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.GetAllRooms = GetAllRooms;
