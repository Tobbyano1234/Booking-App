"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllHotels = exports.GetHotel = exports.DeleteHotel = exports.UpdateHotel = exports.CreateHotel = void 0;
const http_status_1 = __importDefault(require("http-status"));
const hotelModel_1 = __importDefault(require("../models/hotelModel"));
const helperMethods_1 = require("../utils/helperMethods");
const CreateHotel = async (req, res, next) => {
    const newHotel = new hotelModel_1.default(req.body);
    try {
        const record = await newHotel.save();
        return (0, helperMethods_1.successResponse)(res, "Hotel profile created successfully", http_status_1.default.CREATED, record);
    }
    catch (error) {
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.CreateHotel = CreateHotel;
const UpdateHotel = async (req, res, next) => {
    const hotelData = req.body;
    const { id } = req.params;
    try {
        const record = await hotelModel_1.default.findByIdAndUpdate(id, {
            $set: hotelData,
        }, { new: true });
        return (0, helperMethods_1.successResponse)(res, "Hotel profile updated successfully", http_status_1.default.OK, record);
    }
    catch (error) {
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.UpdateHotel = UpdateHotel;
const DeleteHotel = async (req, res, next) => {
    const { id } = req.params;
    try {
        const record = await hotelModel_1.default.findByIdAndDelete(id);
        return (0, helperMethods_1.successResponse)(res, "Hotel profile deleted successfully", http_status_1.default.OK, record);
    }
    catch (error) {
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.DeleteHotel = DeleteHotel;
const GetHotel = async (req, res, next) => {
    const { id } = req.params;
    try {
        const record = await hotelModel_1.default.findById(id);
        return (0, helperMethods_1.successResponse)(res, "Hotel profile fetched successfully", http_status_1.default.OK, record);
    }
    catch (error) {
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.GetHotel = GetHotel;
const GetAllHotels = async (req, res, next) => {
    try {
        const record = await hotelModel_1.default.find();
        return (0, helperMethods_1.successResponse)(res, "All Hotel profiles fetched successfully", http_status_1.default.OK, record);
    }
    catch (error) {
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.GetAllHotels = GetAllHotels;
