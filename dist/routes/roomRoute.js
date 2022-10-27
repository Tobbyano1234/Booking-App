"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const adminAuth_1 = require("../middleware/adminAuth");
const roomController_1 = require("../controller/roomController");
const router = express_1.default.Router();
router.post("/add", auth_1.auth, roomController_1.CreateRoom);
router.put("/update/:id", auth_1.auth, roomController_1.UpdateRoom);
router.delete("/delete/:id", auth_1.auth, roomController_1.DeleteRoom);
router.get("/get-hotel/:id", auth_1.auth, roomController_1.GetRoom);
router.get("/all-hotel", adminAuth_1.adminAuth, roomController_1.GetAllRooms);
exports.default = router;
