import express from "express";
import {
  ForgetPassword,
  LoginUser,
  RegisterUser,
  ResetPassword,
  VerifyUser,
} from "../controller/userController";
import { auth } from "../middleware/auth";
import {
  validateForgetPassword,
  validateLoginUser,
  validateRegisterUser,
  validateResetPassword,
} from "../middleware/validations";

const router = express.Router();

router.post("/register", validateRegisterUser, RegisterUser);
router.get("/verify/:token", VerifyUser);
router.post("/login", validateLoginUser, LoginUser);
router.post("/forget-password", validateForgetPassword, ForgetPassword);
router.post("/reset-password", auth, validateResetPassword, ResetPassword);

export default router;
