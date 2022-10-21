"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("MongoDB Database Connected");
    }
    catch (error) {
        console.log(error);
    }
};
mongoose_1.default.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!!!");
});
mongoose_1.default.connection.on("connected", () => {
    console.log("mongoDB connected!!!");
});
exports.default = connectDB;
