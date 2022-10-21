"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import dotenv from "dotenv";
const db_config_1 = __importDefault(require("./config/db.config"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const hotelRoute_1 = __importDefault(require("./routes/hotelRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
// dotenv.config();
require("dotenv").config();
(0, db_config_1.default)();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use("/api/v1/hotels", hotelRoute_1.default);
app.use("/api/v1/users", userRoute_1.default);
app.use("/api/v1/rooms", hotelRoute_1.default);
// catch 404 and forward to error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
exports.default = app;
