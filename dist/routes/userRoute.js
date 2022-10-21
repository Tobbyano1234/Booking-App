"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const auth_1 = require("../middleware/auth");
const validations_1 = require("../middleware/validations");
const router = express_1.default.Router();
router.post("/register", validations_1.validateRegisterUser, userController_1.RegisterUser);
router.get("/verify/:token", userController_1.VerifyUser);
router.post("/login", validations_1.validateLoginUser, userController_1.LoginUser);
router.post("/forget-password", validations_1.validateForgetPassword, userController_1.ForgetPassword);
router.post("/reset-password", auth_1.auth, validations_1.validateResetPassword, userController_1.ResetPassword);
exports.default = router;
