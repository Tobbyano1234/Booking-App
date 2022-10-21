import { Request, Response, NextFunction } from "express";
import {
  errorResponse,
  serverError,
  successResponse,
} from "../utils/helperMethods";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import httpStatus from "http-status";
import { generateLoginToken } from "../utils/utils";
import { emailVerificationView } from "../mail/emailVerificationView";
import { sendEmail } from "../mail/sendEmail";
import jwt from "jsonwebtoken";
import { forgotPasswordVerification } from "../mail/forgotPasswordVerification";
require("dotenv").config();

const fromUser = process.env.FROM as string;
const emailVerification = process.env.SUBJECT_EMAIL as string;
const passwordReset = process.env.SUBJECT_PASSWORD as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

interface jwtPayload {
  email: string;
  userId: string;
  _id: string;
}

export const RegisterUser = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const { fullName, userName, email, phoneNumber, password } = req.body;

  try {
    const duplicateEmail = await User.findOne({ email });
    if (duplicateEmail) {
      return errorResponse(res, "Email already exist", httpStatus.CONFLICT);
    }
    const duplicateUserName = await User.findOne({ userName });
    if (duplicateUserName) {
      return errorResponse(res, "Username already exist", httpStatus.CONFLICT);
    }
    const duplicatePhoneNumber = await User.findOne({ phoneNumber });
    if (duplicatePhoneNumber) {
      return errorResponse(
        res,
        "Phone Number already exist",
        httpStatus.CONFLICT
      );
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const record = await User.create({
      fullName,
      userName,
      email,
      phoneNumber,
      password: hashPassword,
    });

    const { _id } = record;

    console.log(_id);

    const token = generateLoginToken({ _id, email });

    if (record) {
      const html = emailVerificationView(token);
      await sendEmail(fromUser, email, emailVerification, html);
    }

    return successResponse(res, "User created successful", httpStatus.CREATED, {
      token,
      record,
    });
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

export const VerifyUser = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  try {
    const token = req.params.token;

    const verifiedToken = jwt.verify(token, JWT_SECRET) as jwtPayload;

    const { email, _id } = verifiedToken;

    console.log(_id, email);

    if (!email) {
      return errorResponse(res, "Verification failed", httpStatus.BAD_REQUEST);
    } else {
      const verifiedUser = await User.findOne({ _id, email });

      if (verifiedUser) {
        verifiedUser.isVerified = true;
        await verifiedUser.save();
        return successResponse(
          res,
          "User successfully verified",
          httpStatus.OK,
          verifiedUser
        );
      }
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

export const LoginUser = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const { userName, email, password } = req.body;

  try {
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (userName) {
      user = await User.findOne({ userName });
    } else {
      return errorResponse(
        res,
        "Email or userName is required",
        httpStatus.NOT_FOUND
      );
    }

    if (!user) {
      return errorResponse(res, "User not found", httpStatus.NOT_FOUND);
    }

    const verifiedUser = await bcrypt.compare(password, user.password);

    if (!verifiedUser) {
      return errorResponse(
        res,
        "Incorrect credentials",
        httpStatus.UNAUTHORIZED
      );
    }

    const { _id } = user;

    const token = generateLoginToken({ _id, email });

    if (!user.isVerified) {
      return errorResponse(
        res,
        "Kindly verify your email",
        httpStatus.UNAUTHORIZED
      );
    }

    return successResponse(res, "Successfully logged in", httpStatus.OK, {
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

export const ForgetPassword = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return errorResponse(res, "Email not found", httpStatus.UNAUTHORIZED);
    }

    const { _id } = user;

    const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: "30mins" });
    const html = forgotPasswordVerification(token);
    await sendEmail(fromUser, req.body.email, passwordReset, html);
    return successResponse(
      res,
      "Check email for the verification link",
      httpStatus.OK,
      {}
    );
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

export const ResetPassword = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  try {
    const { password } = req.body;
    const token = req.headers.token;

    const { _id } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById({ _id });

    if (!user) {
      return errorResponse(res, "User does not exist", httpStatus.NOT_FOUND);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    user.password = passwordHash;
    await user.save();

    return successResponse(res, "Successfully change password", httpStatus.OK, {
      user,
    });
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

export const UpdateProfile = async (req: Request, res: Response) => {};
