"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelController_1 = require("../controller/hotelController");
const router = express_1.default.Router();
router.post("/add", hotelController_1.CreateHotel);
router.put("/update/:id", hotelController_1.UpdateHotel);
router.delete("/delete/:id", hotelController_1.DeleteHotel);
router.get("/get-hotel/:id", hotelController_1.GetHotel);
router.get("/all-hotel", hotelController_1.GetAllHotels);
exports.default = router;
