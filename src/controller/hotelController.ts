import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import Hotel from "../models/hotelModel";
import {
  errorResponse,
  serverError,
  successResponse,
} from "../utils/helperMethods";
import User from "../models/userModel";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

interface jwtPayload {
  _id: string;
  email: string;
  userId: string;
}

export const CreateHotel = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.token;

    const { _id } = jwt.verify(token, JWT_SECRET) as jwtPayload;

    const userData = await User.findById({ _id });

    if (!userData) {
      errorResponse(res, "Kindly sign in as user", httpStatus.UNAUTHORIZED);
    }
    // const userId = _id;
    const newHotel = new Hotel({ ...req.body, user: _id });
    const record = await newHotel.save();

    return successResponse(
      res,
      "Hotel profile created successfully",
      httpStatus.CREATED,
      record
    );
  } catch (error) {
    return serverError(res);
  }
};

export const UpdateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hotelData = req.body;
  const { id } = req.params;
  try {
    const record = await Hotel.findByIdAndUpdate(
      id,
      {
        $set: hotelData,
      },
      { new: true }
    );

    return successResponse(
      res,
      "Hotel profile updated successfully",
      httpStatus.OK,
      record
    );
  } catch (error) {
    return serverError(res);
  }
};

export const DeleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const record = await Hotel.findByIdAndDelete(id);

    return successResponse(
      res,
      "Hotel profile deleted successfully",
      httpStatus.OK,
      record
    );
  } catch (error) {
    return serverError(res);
  }
};

export const GetHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const record = await Hotel.findById(id);

    return successResponse(
      res,
      "Hotel profile fetched successfully",
      httpStatus.OK,
      record
    );
  } catch (error) {
    return serverError(res);
  }
};

export const GetAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const record = await Hotel.find();

    return successResponse(
      res,
      "All Hotel profiles fetched successfully",
      httpStatus.OK,
      record
    );
  } catch (error) {
    return serverError(res);
  }
};
