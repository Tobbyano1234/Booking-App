import express from "express";
import {
  ForgetPassword,
  getAllUsers,
  getUser,
  LoginUser,
  RegisterUser,
  ResetPassword,
  UpdateProfile,
  VerifyUser,
} from "../controller/userController";
import { adminAuth } from "../middleware/adminAuth";
import { auth } from "../middleware/auth";
import {
  validateForgetPassword,
  validateLoginUser,
  validateRegisterUser,
  validateResetPassword,
  validateUpdateUser,
} from "../middleware/validations";

const router = express.Router();

router.post("/register", validateRegisterUser, RegisterUser);
router.get("/verify/:token", VerifyUser);
router.post("/login", validateLoginUser, LoginUser);
router.post("/forget-password", validateForgetPassword, ForgetPassword);
router.post("/reset-password", auth, validateResetPassword, ResetPassword);
router.patch("/update", auth, validateUpdateUser, UpdateProfile);
router.get("/getuser", auth, getUser);
router.get("/allusers", adminAuth, getAllUsers);

export default router;
