import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { errorResponse, serverError } from "../utils/helperMethods";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const { token } = req.headers as any;

    if (!token) {
      return errorResponse(
        res,
        "Kindly sign in as a User",
        httpStatus.UNAUTHORIZED
      );
    }

    const verified = jwt.verify(token, JWT_SECRET);

    if (!verified) {
      return errorResponse(
        res,
        "User not verified, you cannot access this route",
        httpStatus.UNAUTHORIZED
      );
    }
    next();
  } catch (error) {
    console.log(error);
    return errorResponse(res, "User is not logged in", httpStatus.FORBIDDEN);
  }
};
