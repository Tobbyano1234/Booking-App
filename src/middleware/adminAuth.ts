import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { errorResponse, serverError } from "../utils/helperMethods";
import User from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface jwtPayload {
  email: string;
  userId: string;
  _id: string;
  isAdmin: boolean;
}

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const { token } = req.headers as any;

    const verified = jwt.verify(token, JWT_SECRET);

    if (!token) {
      return errorResponse(
        res,
        "Kindly sign in as an Admin or User",
        httpStatus.UNAUTHORIZED
      );
    }

    const { _id, isAdmin } = verified as jwtPayload;

    const admin = User.findOne({ _id, isAdmin });

    if (isAdmin === false) {
      return errorResponse(
        res,
        "Kindly sign in as a Admin",
        httpStatus.UNAUTHORIZED
      );
    }

    next();
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Admin is not logged in", httpStatus.FORBIDDEN);
  }
};
