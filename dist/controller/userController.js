"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUser = exports.UpdateProfile = exports.ResetPassword = exports.ForgetPassword = exports.LoginUser = exports.VerifyUser = exports.RegisterUser = void 0;
const helperMethods_1 = require("../utils/helperMethods");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const http_status_1 = __importDefault(require("http-status"));
const utils_1 = require("../utils/utils");
const emailVerificationView_1 = require("../mail/emailVerificationView");
const sendEmail_1 = require("../mail/sendEmail");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const forgotPasswordVerification_1 = require("../mail/forgotPasswordVerification");
require("dotenv").config();
const fromUser = process.env.FROM;
const emailVerification = process.env.SUBJECT_EMAIL;
const passwordReset = process.env.SUBJECT_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const RegisterUser = async (req, res) => {
    const { fullName, userName, email, phoneNumber, password } = req.body;
    try {
        const duplicateEmail = await userModel_1.default.findOne({ email });
        if (duplicateEmail) {
            return (0, helperMethods_1.errorResponse)(res, "Email already exist", http_status_1.default.CONFLICT);
        }
        const duplicateUserName = await userModel_1.default.findOne({ userName });
        if (duplicateUserName) {
            return (0, helperMethods_1.errorResponse)(res, "Username already exist", http_status_1.default.CONFLICT);
        }
        const duplicatePhoneNumber = await userModel_1.default.findOne({ phoneNumber });
        if (duplicatePhoneNumber) {
            return (0, helperMethods_1.errorResponse)(res, "Phone Number already exist", http_status_1.default.CONFLICT);
        }
        const hashPassword = await bcryptjs_1.default.hash(req.body.password, 10);
        const record = await userModel_1.default.create({
            fullName,
            userName,
            email,
            phoneNumber,
            password: hashPassword,
        });
        const { _id } = record;
        console.log(_id);
        const token = (0, utils_1.generateLoginToken)({ _id, email });
        if (record) {
            const html = (0, emailVerificationView_1.emailVerificationView)(token);
            await (0, sendEmail_1.sendEmail)(fromUser, email, emailVerification, html);
        }
        return (0, helperMethods_1.successResponse)(res, "User created successful", http_status_1.default.CREATED, {
            token,
            record,
        });
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.RegisterUser = RegisterUser;
const VerifyUser = async (req, res) => {
    try {
        const token = req.params.token;
        const verifiedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const { email, _id } = verifiedToken;
        console.log(_id, email);
        if (!email) {
            return (0, helperMethods_1.errorResponse)(res, "Verification failed", http_status_1.default.BAD_REQUEST);
        }
        else {
            const verifiedUser = await userModel_1.default.findOne({ _id, email });
            if (verifiedUser) {
                verifiedUser.isVerified = true;
                await verifiedUser.save();
                return (0, helperMethods_1.successResponse)(res, "User successfully verified", http_status_1.default.OK, verifiedUser);
            }
        }
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.VerifyUser = VerifyUser;
const LoginUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        let user;
        if (email) {
            user = await userModel_1.default.findOne({ email });
        }
        else if (userName) {
            user = await userModel_1.default.findOne({ userName });
        }
        else {
            return (0, helperMethods_1.errorResponse)(res, "Email or userName is required", http_status_1.default.NOT_FOUND);
        }
        if (!user) {
            return (0, helperMethods_1.errorResponse)(res, "User not found", http_status_1.default.NOT_FOUND);
        }
        const verifiedUser = await bcryptjs_1.default.compare(password, user.password);
        if (!verifiedUser) {
            return (0, helperMethods_1.errorResponse)(res, "Incorrect credentials", http_status_1.default.UNAUTHORIZED);
        }
        const { _id, isAdmin } = user;
        const token = (0, utils_1.generateLoginToken)({ _id, email, isAdmin });
        if (!user.isVerified) {
            return (0, helperMethods_1.errorResponse)(res, "Kindly verify your email", http_status_1.default.UNAUTHORIZED);
        }
        return (0, helperMethods_1.successResponse)(res, "Successfully logged in", http_status_1.default.OK, {
            token,
            user,
        });
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.LoginUser = LoginUser;
const ForgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel_1.default.findOne({
            email,
        });
        if (!user) {
            return (0, helperMethods_1.errorResponse)(res, "Email not found", http_status_1.default.UNAUTHORIZED);
        }
        const { _id } = user;
        const token = jsonwebtoken_1.default.sign({ _id }, JWT_SECRET, { expiresIn: "30mins" });
        const html = (0, forgotPasswordVerification_1.forgotPasswordVerification)(token);
        await (0, sendEmail_1.sendEmail)(fromUser, req.body.email, passwordReset, html);
        return (0, helperMethods_1.successResponse)(res, "Check email for the verification link", http_status_1.default.OK, {});
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.ForgetPassword = ForgetPassword;
const ResetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const token = req.headers.token;
        const { _id } = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await userModel_1.default.findById({ _id });
        if (!user) {
            return (0, helperMethods_1.errorResponse)(res, "User does not exist", http_status_1.default.NOT_FOUND);
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        user.password = passwordHash;
        await user.save();
        return (0, helperMethods_1.successResponse)(res, "Successfully change password", http_status_1.default.OK, {
            user,
        });
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.ResetPassword = ResetPassword;
const UpdateProfile = async (req, res) => {
    try {
        const token = req.headers.token;
        const { _id } = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const { fullName, phoneNumber, avatar } = req.body;
        const user = await userModel_1.default.findById({ _id });
        if (!user) {
            return (0, helperMethods_1.errorResponse)(res, "User not found", http_status_1.default.NOT_FOUND);
        }
        const updatedUser = await userModel_1.default.findByIdAndUpdate({ _id }, {
            fullName,
            phoneNumber,
            avatar,
        });
        return (0, helperMethods_1.successResponse)(res, "User updated successfully", http_status_1.default.CREATED, updatedUser);
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.UpdateProfile = UpdateProfile;
const getUser = async (req, res) => {
    try {
        const token = req.headers.token;
        const { _id } = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await userModel_1.default.findById({ _id });
        if (!user) {
            return (0, helperMethods_1.errorResponse)(res, "User not found", http_status_1.default.NOT_FOUND);
        }
        return (0, helperMethods_1.successResponse)(res, "Successfully fetched user", http_status_1.default.OK, user);
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.getUser = getUser;
const getAllUsers = async (req, res) => {
    try {
        const token = req.headers.token;
        const { _id } = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const record = await userModel_1.default.findById({ _id });
        if (!record) {
            return (0, helperMethods_1.errorResponse)(res, "Permission denied", http_status_1.default.BAD_REQUEST);
        }
        const users = await userModel_1.default.find();
        if (!users) {
            return (0, helperMethods_1.errorResponse)(res, "Users not found", http_status_1.default.NOT_FOUND);
        }
        return (0, helperMethods_1.successResponse)(res, "User updated successfully", http_status_1.default.OK, users);
    }
    catch (error) {
        console.log(error);
        return (0, helperMethods_1.serverError)(res);
    }
};
exports.getAllUsers = getAllUsers;
